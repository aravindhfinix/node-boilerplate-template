import { Admin } from "../modules/v1/admin/models/admin-model";
import { Session } from "../modules/v1/admin/models/session-model";
import { User } from "../modules/v1/user/models/user-model";

class ChatHelper {
    clients = new Map();

    setIo(io) {
        this.io = io;
    }

    addClient(socket) {
        const { id: clientId } = socket.handshake.query;

        if (!this.clients.has(clientId)) {
            this.clients.set(clientId, []);
        }

        this.clients.get(clientId).push({ id: socket.id, socket });

        // this.logClientTable();
    }

    removeClientById(id, socketId) {
        if (this.clients.has(id)) {
            let clientSet = this.clients.get(id);
            clientSet = clientSet.filter(client => client.id !== socketId);

            if (clientSet.length === 0) {
                this.clients.delete(id);
            } else {
                this.clients.set(id, clientSet);
            }

            console.log(`Client removed: ${id}`);
            // this.logClientTable();

            return clientSet;
        }
    }

    logClientTable() {
        const table = Array.from(this.clients, ([clientId, clientSet]) => ({
            ID: clientId,
            Sockets: clientSet.map(client => client.id).join(', '),
        }));

        console.table(table);
    }

    sendToAllClients(event, message) {
        console.log('Sending event:', event);
        console.log('Message:', message);

        this.io.emit(event, message);
    }

    sendToSocketClients(receiver, event, message) {
        if (receiver === 'all') {
            this.sendToAllClients(event, message);
        } else if (typeof receiver === 'string') {
            this.sendToSocketClient(receiver, event, message);
        } else if (Array.isArray(receiver)) {
            for (const clientId of receiver) {
                this.sendToSocketClient(clientId.toString(), event, message);
            }
        } else {
            console.log('Invalid receiver parameter:', receiver);
        }
    }

    async sendToSocketClient(receiver, event, message) {
        console.log('Sending event:', event);
        console.log('Receiver:', receiver);
        console.log('Message:', message);

        const clientsArray = this.clients.get(receiver);

        if (clientsArray !== undefined && clientsArray.length !== 0) {
            for (const client of clientsArray) {
                const { socket } = client;
                if (socket !== undefined) {
                    console.log(`Emitting event "${event}" to user with ID: ${receiver}`);
                    try {
                        socket.emit(event, message);
                    } catch (error) {
                        console.error(`Error emitting event: ${error}`);
                    }
                }
            }
        }
    }

    async checkAuthentication(token, id) {
        try {

            if (id === "null" || !id || !token) {
                console.error(`Connection failed`);
                throw new Error('ID or Authorization missing');
            }

            const [checkMember, checkAdmin] = await Promise.all([
                User.findById(id),
                Admin.findById(id),
            ]);

            if (!checkMember && !checkAdmin) {
                throw new Error('User not found');
            }

            const session = await Session.findOne({ session_token: token, status: 1 }).exec();

            if (!session) {
                throw new Error('Session not found');
            }

            if (session.user_id != id) {
                throw new Error('User ID mismatch');
            }

            return { success: true, message: 'Authentication successful' };
        } catch (error) {
            console.error('Error in checkAuthentication:', error);
            throw new Error(error);
        }
    }


}

export const helper = new ChatHelper();
