import BaseConfig from "./base-config";

/**
 * router config
 */
export default class RouterConfig extends BaseConfig { 

    constructor() {
        super();
        this.router = this.express.Router();
    }

}