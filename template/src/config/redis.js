import Redis from 'ioredis';
import chalk from 'chalk';
import mongoose from 'mongoose';

export default class RedisCache {
    constructor() {
        const params = {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        };
        this.redis = new Redis(params);
    }

    async initialize() {
        try {
            console.log('Connecting to Redis server...');
            await this.waitForConnection();
            console.log(chalk.blueBright.bold.italic('Redis server connected'));
            mongoose.set('debug', (collectionName, method) => {

                const Methods = new Set(['insertMany', 'insertOne', 'findByIdAndUpdate', 'findOneAndUpdate', 'findOneAndDelete', 'findByIdAndDelete', 'updateMany', 'updateOne', 'deleteMany', 'deleteOne']);

                if (collectionName === 'admins' && Methods.has(method)) {
                    this.deleteCache(['adminList']);
                }
                if (collectionName === 'users' && Methods.has(method)) {
                    this.deleteCache(['userList']);
                }
            });

        } catch (error) {
            console.error(chalk.red.bold('Error connecting to Redis server:', error.message));
            console.error(chalk.red.bold('Exiting application due to Redis connection error.'));
            process.exitCode = 1;
            process.exit();
        }
    }

    waitForConnection() {
        return new Promise((resolve, reject) => {
            this.redis.on('connect', resolve);
            this.redis.on('error', reject);
        });
    }

    async getCache(key) {
        this.ensureConnection();
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async setCache(key, value) {
        this.ensureConnection();
        await this.redis.set(key, JSON.stringify(value));
    }

    async deleteCache(keys) {
        this.ensureConnection();

        for (const key of keys) {
            await this.redis.del(key);
        }
    }

    ensureConnection() {
        if (!this.redis) {
            console.error(chalk.red.bold('Trying to access Redis without an established connection.'));
            throw new Error('Redis connection not established.');
        }
    }


    async disconnect() {
        try {
            if (this.redis && typeof this.redis.disconnect === 'function') {
                await this.redis.disconnect();
                console.log(chalk.redBright.bold('Disconnected from Redis server.'));
            } else {
                console.log(chalk.redBright.bold('No active Redis connection to disconnect.'));
            }
        } catch (error) {
            console.error(chalk.red.bold('Error disconnecting from Redis:', error.message));
        }
    }
}
