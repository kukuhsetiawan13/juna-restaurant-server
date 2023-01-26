'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.Order)
    }
  }
  Transaction.init({
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Table ID must be provided.'},
        notEmpty: {msg: 'Table ID must be provided.'},
      }
    },
    totalItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Total items must be provided.'},
        notEmpty: {msg: 'Total items must be provided.'},
      }
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Total price must be provided.'},
        notEmpty: {msg: 'Total price must be provided.'},
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};