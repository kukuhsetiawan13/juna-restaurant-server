const router = require('express').Router()
const Controller = require('../controllers')


router.post('/create', Controller.createTransactions)

router.post('/find', Controller.getTransaction)


module.exports = router