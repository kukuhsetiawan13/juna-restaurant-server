'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Transaction)
      Order.belongsTo(models.Food)
    }
  }
  Order.init({
    FoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Food ID must be provided.'},
        notEmpty: {msg: 'Food ID must be provided.'},
      }
    },
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Transaction ID must be provided.'},
        notEmpty: {msg: 'Transaction ID must be provided.'},
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Quantity must be provided.'},
        notEmpty: {msg: 'Quantity must be provided.'},
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Price must be provided.'},
        notEmpty: {msg: 'Price must be provided.'},
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};