import socketIO from "socket.io";
import { helper } from "../utils/socket.io-helper";
import { consoleLoggerRedirector } from "./console-logger";

export default class SocketConfig {
    constructor(server) {
        let originValue = "*";

        if (process.env.NODE_ENV == "production") {
            originValue = process.env.WHITE_LISTED_DOMAINS
                ? process.env.WHITE_LISTED_DOMAINS.split(",")
                : "*";
        }

        const socketParams = {
            cors: {
                origin: originValue,
                methods: ["GET", "POST"],
            },
            transports: ["websocket", "polling"],
        };

        this.socket = socketIO(server, socketParams);
        helper.setIo(this.socket);
        consoleLoggerRedirector.watchLogfile(this.socket);
    }


    /**
     * @param {*} socket
     */
    async onConnection(socket) {
        console.log("New connection");

        try {

            // const { Authorization, id } = socket.handshake.query;

            // const checkAuth = await helper.checkAuthentication(Authorization, id);

            // if (!checkAuth) {
            //     socket.disconnect();
            //     console.log(`Authentication failed for socket id ${socket.id}`);
            //     return;
            // }

            if (socket.handshake.query.id) {
                // Add to client array
                helper.addClient(socket);

                console.log(`A user has logged in on ${socket.handshake.query.id}`);
            } else {
                console.log('Anonymous connected to the server')
            }

            // Listener functions
            eventHandler(socket);

            socket.on(EVENTS.DISCONNECT, (reason) => {
                if (socket.handshake.query.id) {
                    helper.removeClientById(socket.handshake.query.id, socket.id);
                    console.log(
                        `A user disconnected ${socket.handshake.query.id} with socket id ${socket.id} due to ${reason}`
                    );
                } else {
                    console.log('Anonymous disconnected from the server')
                }
            });
        } catch (error) {
            console.error("Error in onConnection:", error);
            socket.disconnect();
            console.log(`Connection failed for socket id ${socket.id}`);
        }
    }
}

export const EVENTS = {
    DISCONNECT: "disconnect",
    PING: "PING"
};

export const eventHandler = (socket) => {
    socket.on(EVENTS.PING, () => {
        helper.sendToSocketClients(socket.handshake.query.id, "PING", {
            message: "pong",
        });
    });
};


