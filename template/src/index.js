import http from 'http';
import https from 'https';
import chalk from 'chalk';
import fs from 'fs';

import RouteServiceProvider from './providers/route-service-provider';
import SocketConfig from './config/socket';
import { consoleLoggerRedirection } from './config/console-logger';
import { mongoose, redis, backup } from './config';


consoleLoggerRedirection.redirectConsoleLogsToWinston();

const routeServiceProvider = new RouteServiceProvider();

const options = process.env.HTTPS === 'true'
    ? {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
        ca: fs.readFileSync(process.env.SSL_FULL_CHAIN),
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
    }
    : undefined;

const server = process.env.HTTPS === 'true'
    ? https.createServer(options, routeServiceProvider.app)
    : http.createServer(routeServiceProvider.app);

const socketConnection = new SocketConfig(server);
socketConnection.socket.on('connection', socketConnection.onConnection);

redis.initialize()
mongoose.connectDB()
backup.dataBackup()

server.listen(process.env.PORT, () => {
    if (process.send) {
        process.send('ready');
    }
    console.log(chalk.green.bold.italic(`App running on port ${process.env.PORT}`));
});

module.exports = server;

