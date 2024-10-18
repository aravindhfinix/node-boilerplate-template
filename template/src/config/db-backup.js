import BaseConfig from "./base-config";
import cron from 'node-cron';
import { exec } from 'child_process';
import fs from 'fs';

export default class DbBackup extends BaseConfig {
    constructor() {
        super();
    }

    async dataBackup() {
        // Replace with your MongoDB connection information
        const mongoURI = process.env.MONGODB_URL;
        const backupDirectory = `${process.cwd()}/db-backup`;
        const maxBackups = 50; // Maximum number of backups to retain

        // Define the backup command with a timestamped compressed output file
        const createBackup = () => {
            const timestamp = new Date().toISOString().replace(/:/g, '-'); // Remove colons from timestamp
            const backupFileName = `backup-${timestamp}.gz`;
            const backupPath = `${backupDirectory}/${backupFileName}`;

            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, { recursive: true });
            }

            const backupCommand = `mongodump --uri="${mongoURI}" --archive="${backupPath}" --gzip`;

            console.log('Starting MongoDB backup...');
            const child = exec(backupCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('MongoDB backup failed:', error);
                } else {
                    console.log('MongoDB backup completed successfully.');
                }
            });

            child.stdout.on('data', (data) => {
                console.log(data);
            });

            child.stderr.on('data', (data) => {
                console.error(data);
            });
        };

        // Schedule the backup to run daily at 12 AM
        cron.schedule('0 0 * * *', () => {
            createBackup();
            cleanupOldBackups(maxBackups);
        }, {
            timezone: 'Asia/Kolkata'
        });
    }
}

const cleanupOldBackups = (maxBackups) => {
    const backupDirectory = './../../dbBackUp';

    fs.readdir(backupDirectory, (err, files) => {
        if (err) {
            console.error('Error reading backup directory:', err);
        } else {
            const backupsToDelete = files.slice(0, -maxBackups);
            backupsToDelete.forEach((backup) => {
                const backupPath = `${backupDirectory}/${backup}`;
                fs.unlink(backupPath, (err) => {
                    if (err) {
                        console.error(`Error deleting backup ${backup}:`, err);
                    } else {
                        console.log(`Backup ${backup} deleted.`);
                    }
                });
            });
        }
    });
};
