const { sequelize } = require('../models')
const { Food, Transaction } = require('../models')
const { Op } = require("sequelize");


class Controller {

    static async getFood(req, res, next) {
        try {
            const foodList = await Food.findAll()

            res.status(200).json(foodList)
        } catch(err) {
            next(err)
        }
    }

    static async createTransactions(req, res, next) {
        try {
            res.json('transactions')            
        } catch(err) {
            next(err)
        }
    }

    static async getTransaction(req, res, next) {
        try {
            res.json('get transaction')

        } catch(err) {
            next(err)
        }
    }

}

module.exports = Controller