import mongoose from "mongoose";
import config from "../config/index";
import { user } from "../models/users";

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
                useUnifiedTopology: true
            });
        }
    }

    getAllUsers() {
        return this.connection.then(() => {
            return user.find().exec();
        });
    }
}

export default MongoLib;

