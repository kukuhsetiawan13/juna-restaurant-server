const router = require('express').Router()
const Controller = require('../controllers')


router.get('', Controller.getCoupons)

router.get('/verify', Controller.verifyCoupon)


module.exports = router