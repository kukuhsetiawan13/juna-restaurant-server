const router = require('express').Router()
const FoodRouter = require('./FoodRouter')
const TransactionRouter = require('./TransactionRouter')
const CouponRouter = require('./CouponRouter')

router.use('/food', FoodRouter)

router.use('/transaction', TransactionRouter)

router.use('/coupons', CouponRouter)


module.exports = router