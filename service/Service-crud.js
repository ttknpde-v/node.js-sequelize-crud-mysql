const book = require('../module/Book')
const log = require('../log/Logging').logger

class ServiceCrud {
    reads = async () => {
            try {
                const books = await book.findAll()
                if (books.length > 0) {
                    return books
                } else {
                    log.debug("there are no books in bookstore")
                    return books
                }
            } catch (errors) {
                log.warn("somethings was wrong in reads method and cause is "+errors.message)
                throw errors
            }
    }

    read = async (id) => {
        try {
            const found = await book.findByPk(id)
            if (found) {
                //console.log(found)
                return found
            } else {
                log.debug("there are no book in bookstore")
                return found
            }
        } catch (errors) {
            log.warn("somethings was wrong in read method and cause is "+errors.message)
            throw errors
        }
    }

    delete = async (id) => {
        try {
            return await book.findAll({where:{id:id}})
                .then(async data=>{
                    await book.destroy({ where:{id:id} }).then(()=>{
                        return `deleted`
                    }) // destroy() method for deleting
                    return `not found id ${id}`
                }).catch(errors => {
                    log.debug("there are no book in bookstore for deleting")
                    throw errors
                })

        } catch (errors) {
            log.warn("somethings was wrong in read method and cause is "+errors.message)
            throw errors
        }
    }
    create = async (name,price,productiondate) => {
        try {
            //console.log(response)
            return await book.create({name, price, productiondate})
        } catch (errors) {
            log.warn("somethings was wrong in create method and cause is "+errors.message)
            throw errors
        }
    }

    update = async (name,price,productiondate , id) => {
        try {
            //console.log(response)
            return await book.findAll( {where: {id : id}}) // search all with where option
                .then(async data=>{
                    // console.log(data) // data stores default values
                    // log.info("found book id "+id)
                    if (data.length !== 0) {
                        await book.update({name,price,productiondate}, {where: {id:id} })
                        return `updated`
                    }
                    return `not found id ${id}`
                     // update
                }).catch(errors => {
                    log.debug("there are no book in bookstore for updating")
                    throw errors
                })
        } catch (errors) {
            log.warn("somethings was wrong in update method and cause is "+errors.message)
            throw errors
        }
    }
}


module.exports = ServiceCrud

