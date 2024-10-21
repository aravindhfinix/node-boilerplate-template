import cors from 'cors';
import xss from 'xss-clean';
import express from 'express';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import apiLogger from './api-logger';
import ErrorHandler from '../utils/error-handler';

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});

export const corsOptions = {
    origin: (origin, callback) => {
        if (process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            const whiteListedDomains = process.env.WHITE_LISTED_DOMAINS.split(',');
            if (whiteListedDomains.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
};

export default class ExpressConfig {
    constructor() {
        this.app = express();
        this.app.use(apiLogger.createLog)
        if (process.env.HTTPS === 'true') {
            this.app.set('trust proxy', true);
        }
        this.app.use(helmet());
        this.app.use(xss());
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(fileUpload({ createParentPath: true }));
        this.app.use(limiter);
        this.app.use(express.static('public', {
            setHeaders: function (res, path) {
                if (path.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript');
                }
            }
        }));
        this.app.use(ErrorHandler.handleError);
    }
}
