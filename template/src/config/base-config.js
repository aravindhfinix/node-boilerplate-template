import mongoose from 'mongoose';
import Express from './express';


// Basic configuration 
export default class BaseConfig extends Express {

    constructor() {
        super()
        //set mongoose
        this.mongoose = mongoose;
    }
}

