const log = require('../log/Logging').logger
const path = require('../log/Logging').path
const dotenv = require('dotenv')
dotenv.config({path: path.resolve('../env/.env')})
class Config {
    get sequelize() {
        return require("sequelize")
    }
    get connect() {
        return new this.sequelize(
            process.env.SQLX_DATABASE,
            process.env.SQLX_USERNAME,
            process.env.SQLX_PASSWORD,
            {
                // set port & host in this block
                dialect: "mysql",
                host: process.env.SQLX_HOST,
                port: process.env.SQLX_PORT
            }
        ) // ended return
    }
}
/*
new Config().connect.authenticate()
    .then(() => {
        log.info('Connection has been established successfully.');
    })
    .catch(err => {
        log.debug('Unable to connect to the database:', err);
        throw err
    });
*/

module.exports = new Config()
