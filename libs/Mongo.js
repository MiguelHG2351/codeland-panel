import mongoose from "mongoose";
import config from "../config/index";

const userDB = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

const mongoURI = `mongodb+srv://${userDB}:${password}@${host}/${config.dbName}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.dbName = config.dbName;
        if(!MongoLib.connection) {
            this.connection = mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        }
    }
}

export default MongoLib;

