import BaseConfig from './base-config';
import dbBackup from './db-backup';
import Mongoose from './mongoose';
import RedisCache from './redis';


//basic env and express config
export const config = new BaseConfig();
//base mongoose config
export const mongoose = new Mongoose();
//db backup config
export const backup = new dbBackup();
//redis cache server
export const redis = new RedisCache();
