const log =require('../log/Logging').logger
class Test {
    constructor() {
        const app = require('../service/Service-rest').express()
        const router = require('../router/router')
        app.use('/api',router).listen(5000,function (errors) {
            if (errors) throw errors
            else log.info(`u r in port 5000`)
        })
    }
}

new Test()