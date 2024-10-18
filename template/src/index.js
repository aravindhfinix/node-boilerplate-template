import http from 'http';
import https from 'https';
import chalk from 'chalk';
import fs from 'fs';

import RouteServiceProvider from './providers/route-service-provider';
import SocketConfig from './config/socket';
import { consoleLoggerRedirector } from './config/console-logger';
import { mongoose, redis, backup } from './config';


consoleLoggerRedirector.redirectConsoleLogsToWinston();

const routeServiceProvider = new RouteServiceProvider();

const options = process.env.HTTPS === 'true'
    ? {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
        ca: fs.readFileSync(process.env.SSL_FULLCHAIN),
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
    }
    : undefined;

const server = process.env.HTTPS === 'true'
    ? https.createServer(options, routeServiceProvider.app)
    : http.createServer(routeServiceProvider.app);

const socketConnecton = new SocketConfig(server);
socketConnecton.socket.on('connection', socketConnecton.onConnection);

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

