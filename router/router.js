const log = require('../log/Logging').logger
const serviceCrud=require('../service/Service-crud')
    , ServiceCrud = new serviceCrud()

let bodyParser = require('../service/Service-rest').bodyParser
let router = require('../service/Service-rest').express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : true}))

const dateObject = new Date(),
    date = (`0${dateObject.getDate()}`).slice(-2),
    month = (`0${dateObject.getMonth() + 1}`).slice(-2),
    year = dateObject.getFullYear()
// log.info(`${year}-${month}-${date}`)

router.get('/reads',async (req , res) => {
    try {
        await ServiceCrud.reads().then((books) => {
            return res.status(202).json({
                status:"accepted",
                response : books
            })
        })
    } catch (errors) {
        log.warn(`course : ${errors.message}`)
        throw errors
    }
})

router.get('/read/(:id)',async (req , res) => {
    try {
        await ServiceCrud.read(req.params["id"]).then((book) => {
            return res.status(202).json({
                status:"accepted",
                response : book
            })
        })
    } catch (errors) {
        log.warn(`course : ${errors.message}`)
        throw errors
    }
})

router.post('/create',async (req , res) => {
    try {
        let {name ,price} = req.body
        let productiondate = `${year}-${month}-${date}`
        await ServiceCrud.create(name ,price,productiondate).then((response) => {
            return res.status(201).json({
                status:"created",
                response : response
            })
        })
    } catch (errors) {
        log.warn(`course : ${errors.message}`)
        throw errors
    }
})

router.put('/update/(:id)',async (req , res) => {
    try {
        let {name ,price,productiondate} = req.body
        let id = req.params["id"]
        await ServiceCrud.update(name ,price,productiondate,id).then((response) => {
            return res.status(200).json({
                status:"ok",
                response : response
            })
        })
    } catch (errors) {
        log.warn(`course : ${errors.message}`)
        throw errors
    }
})

router.delete('/delete/(:id)',async (req , res) => {
    try {
        let id = req.params["id"]
        await ServiceCrud.delete(id).then((response) => {
            return res.status(200).json({
                status:"ok",
                response : response
            })
        })
    } catch (errors) {
        log.warn(`course : ${errors.message}`)
        throw errors
    }
})

module.exports = router

