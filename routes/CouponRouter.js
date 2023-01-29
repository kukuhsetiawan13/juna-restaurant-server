const router = require('express').Router()
const Controller = require('../controllers')


router.get('', Controller.getCoupons)

router.post('/verify', Controller.verifyCoupon)


module.exports = router