class ServiceRest {
    static get express() {
        return require('express')
    }
    static get bodyParser() {
        return require('body-parser')
    }
}

module.exports = ServiceRest