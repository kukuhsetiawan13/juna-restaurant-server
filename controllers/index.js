const { sequelize } = require('../models')
const { Food, Transaction, Order, Coupon } = require('../models')
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
        const t = await sequelize.transaction();
        try {
            const { tableId, orders } = req.body 
            
            if(!orders || orders.length === 0) throw ('Orders must be provided.')

            const totalItems = orders.reduce((total, item) => total + item.quantity, 0)
            const totalPrice = orders.reduce((total, item) => total + item.price, 0)

            const newTransaction = await Transaction.create({
                tableId,
                totalItems,
                totalPrice
            }, {transaction: t})

            for(let order of orders) {
                await Order.create({
                    TransactionId: newTransaction.id,
                    FoodId: order.FoodId,
                    price: order.price,
                    quantity: order.quantity
                }, {transaction: t})
            }

            const response = {
                ...newTransaction.dataValues,
                orders
            }

            await t.commit();
            res.status(201).json(response)
        } catch(err) {
            await t.rollback();
            next(err)
        }
    }

    static async getTransaction(req, res, next) {
        try {

            const {TransactionId} = req.body

            if(!TransactionId) throw ('Transaction ID must be provided.')

            const transaction = await Transaction.findByPk(TransactionId)
            if(!transaction) throw ('Data not found.')

            const orders = await Order.findAll({
                where: {
                    TransactionId
                },
                include: 'Food'
            })

            const response = {
                ...transaction.dataValues,
                orders
            }

            res.json(response)

        } catch(err) {
            next(err)
        }
    }

    static async getTransaction(req, res, next) {
        try {

            const {TransactionId} = req.body

            if(!TransactionId) throw ('Transaction ID must be provided.')

            const transaction = await Transaction.findByPk(TransactionId)
            if(!transaction) throw ('Data not found.')

            const orders = await Order.findAll({
                where: {
                    TransactionId
                },
                include: 'Food'
            })

            const response = {
                ...transaction.dataValues,
                orders
            }

            res.json(response)

        } catch(err) {
            next(err)
        }
    }

    static async getTransaction(req, res, next) {
        try {

            const {TransactionId} = req.body

            if(!TransactionId) throw ('Transaction ID must be provided.')

            const transaction = await Transaction.findByPk(TransactionId)
            if(!transaction) throw ('Data not found.')

            const orders = await Order.findAll({
                where: {
                    TransactionId
                },
                include: 'Food'
            })

            const response = {
                ...transaction.dataValues,
                orders
            }

            res.json(response)

        } catch(err) {
            next(err)
        }
    }

    static async getCoupons (req, res, next) {
        try {
            const coupons = await Coupon.findAll()

            res.status(200).json(coupons)
        } catch(err) {
            next(err)
        }
    }

    static async verifyCoupon (req, res, next) {
        try {
            const {coupon} = req.body

            if(!coupon) throw ('Coupon must be provided.')

            const theSearchedCoupon = await Coupon.findOne({
                where: {
                    name: {
                        [Op.iLike]: coupon,
                    }
                }
            })

            if(!theSearchedCoupon) throw ('Data not found.')

            res.status(200).json(theSearchedCoupon)
        } catch(err) {
            next(err)
        }
    }

}

module.exports = Controller