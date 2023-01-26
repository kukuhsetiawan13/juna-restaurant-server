const router = require('express').Router()
const Controller = require('../controllers')


router.get('', Controller.getFood)


module.exports = router