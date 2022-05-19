const yargs = require('yargs/yargs')(process.argv.slice(2))
const { ObjectTools } = require('../utils/tools');
require('dotenv').config();

let args = yargs
                .default({
                    "MODE": "FORK",
                    "PORT": process.env.PORT || 8000,
                })
                .alias({
                    m: "MODE",
                    p: "PORT"
                })       
            .argv;
args = ObjectTools.removeAllPropertiesExcept(args, ["MODE", "PORT"]);

const config = {
    ADMIN_PHONE: process.env.ADMIN_PHONE,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASS_APP: process.env.ADMIN_PASS_APP,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    TWILIO_WPP_PHONE: process.env.TWILIO_WPP_PHONE,
    SELECTED_STORAGE: process.env.STORAGE,
    SESSION_SECRET: process.env.SESSION_SECRET || "NO SUPER SECRET"
}

const DB = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "4devs",
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    },
    mongoDB: {
        uri: `mongodb://${process.env.MONGO_DB_HOST || "localhost"}:${process.env.MONGO_DB_PORT || "27017"}/${process.env.MONGO_DB_NAME || "4devs"}`,
        atlas_uri: `${process.env.MONGO_ATLAS}` || ""
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./data/db/${process.env.DB_NAME || "4devs"}.sqlite`
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    }
}

module.exports = { args, config, DB };