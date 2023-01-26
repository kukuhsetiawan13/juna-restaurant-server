const router = require('express').Router()
const FoodRouter = require('./FoodRouter')
const TransactionRouter = require('./TransactionRouter')


router.use('/food', FoodRouter)

router.use('/transaction', TransactionRouter)


module.exports = router