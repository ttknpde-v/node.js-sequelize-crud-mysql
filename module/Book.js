const connect = require('../configuration/Config').connect
const sequelize = require('../configuration/Config').sequelize
const log = require('../log/Logging').logger
class Book {
    get book() {
        log.info("book method is working in Book.js")
        return connect.define("books",
            {
                id: {
                    type: sequelize.INTEGER ,
                    primaryKey: true ,
                    autoIncrement: true
                } ,
                name: {
                    type: sequelize.STRING
                } ,
                price: {
                    type: sequelize.DECIMAL
                }
                ,
                productiondate: {
                    type: sequelize.DATE
                }
            } ,
            {
                // freeze name table not using *s on name
                freezeTableName: true ,
                // don't use createdAt/update
                timestamps: false
            }
        );
    } // ended book method


}

module.exports = new Book().book