const router = require('express').Router()
const Controller = require('../controllers')


router.post('', Controller.createTransactions)

router.get('', Controller.getTransaction)


module.exports = router