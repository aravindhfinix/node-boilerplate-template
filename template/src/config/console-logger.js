import winston from 'winston';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const logDirectory = 'logs';
const logFileName = 'combined.log';
const logFilePath = path.resolve(process.cwd(), logDirectory, logFileName);

class ConsoleLoggerRedirector {
  static stripAnsi(str) {
    if (typeof str === 'string') {
      return str.replace(/\u001B\[[0-9;]*[JKmsu]/g, '');
    }
    return str; // Return as is if not a string
  }

  static stringifyIfObject(arg) {
    return typeof arg === 'object' ? JSON.stringify(arg, (key, value) => {
      return typeof value === 'bigint' ? Number(value) : value;
    }) : arg;
  }

  redirectConsoleLogsToWinston() {
    const maxFileSize = 1000000; // Maximum size of each log file in bytes
    const maxFiles = 5; // Maximum number of log files to keep

    const fileTransport = new winston.transports.File({
      filename: logFilePath,
      maxFiles: maxFiles,
      maxsize: maxFileSize,
      tailable: true
    });

    const logger = winston.createLogger({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [fileTransport],
    });
    const originalConsole = { ...console };

    console.log = (...args) => {
      const cleanedArgs = args.map(arg => ConsoleLoggerRedirector.stripAnsi(ConsoleLoggerRedirector.stringifyIfObject(arg)));
      logger.info(cleanedArgs.join(' '));
      originalConsole.log.apply(console, args); // Use apply to call the original function
    };

    console.error = (...args) => {
      const cleanedArgs = args.map(arg => ConsoleLoggerRedirector.stripAnsi(ConsoleLoggerRedirector.stringifyIfObject(arg)));
      logger.error(cleanedArgs.join(' '));
      originalConsole.error.apply(console, args); // Use apply to call the original function
    };

    console.table = (...args) => {
      // Exclude console.table logs from being stored
      originalConsole.table.apply(console, args); // Call the original function without logging to winston
    };

  }

  watchLogfile(io) {
    const logFilePath = path.resolve(process.cwd(), 'logs/combined.log');

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '', { flag: 'wx' }, (err) => {
        if (err) {
          console.error('Error creating log file:', err);
        } else {
          console.log('Log file created successfully.');
        }
      })
    }

    const watcher = chokidar.watch(logDirectory, { ignored: /^\./, persistent: true });

    watcher
      .on('change', (filePath) => {
        if (filePath === 'logs/combined.log') {
          fs.readFile(logFilePath, 'utf8', async (err, rawData) => {
            if (err) {
              console.error(err);
            } else {
              const data = await processAndSortLogs(rawData);
              // Emit 'log-updated' event with the new log data
              io.emit('log-updated', { data });
            }
          });
        }
      })
      .on('error', (error) => console.error('Error watching log file:', error));
  }
}

export const consoleLoggerRedirector = new ConsoleLoggerRedirector();


export const processAndSortLogs = (data) => {
  let logs = data.split('\n')
    .filter(line => line.length > 0)
    .map(line => {
      try {
        const [timestamp, level, ...messageArr] = line.split(' ');
        const message = messageArr.join(' ');

        if (message.startsWith('{') && message.endsWith('}')) {
          const parsedMessage = JSON.parse(message);
          return { timestamp, level, message: parsedMessage };
        } else {
          return { timestamp, level, message };
        }
      } catch (err) {
        return line;
      }
    });

  logs = logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Return only the last 600 logs
  return logs.slice(-600);
};