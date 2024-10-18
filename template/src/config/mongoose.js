import BaseConfig from './base-config';
import chalk from 'chalk';


/**
 * Mongoose configuration class to connect to MongoDB using Mongoose
 */
export default class Mongoose extends BaseConfig {
    constructor() {
        super();
        this.mongoose.set('debug', true)
    }

    /**
     * Connect to MongoDB
     */
    connectDB() {
        const { mongoose } = this;
        const { MONGODB_URL, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_NAME, HOST, DB_NAME } = process.env;

        let connectionString = MONGODB_URL;
        let connectionType;

        if (!connectionString) {
            connectionString = MONGODB_PASSWORD
                ? `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authMechanism=DEFAULT&authSource=admin`
                : `mongodb://${HOST}/${DB_NAME}`;

            connectionType = MONGODB_PASSWORD
                ? 'with password'
                : 'without password';
        } else {
            connectionType = 'with URL';
        }

        console.log(`Mongodb connecting ${connectionType}`);

        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(chalk.yellowBright.bold.italic('Mongodb successfully connected'));
        });

        connection.on('error', (err) => {
            console.error('Mongodb connection failed', err);
        });

        connection.on('disconnected', () => {
            if (process.env.NODE_process.env !== 'test') {
                console.log(chalk.red.bold.italic('Mongodb disconnected'));
            }
        });
    }



    /**
     * Disconnect from MongoDB
     */
    async disconnectDB() {
        if (this.mongoose && this.mongoose.connection) {
            try {
                await this.mongoose.disconnect();
            } catch (error) {
                console.error('Error occurred while disconnecting from MongoDB:', error);
                throw error; // Re-throw the error for handling at a higher level
            }
        }
    }
}
