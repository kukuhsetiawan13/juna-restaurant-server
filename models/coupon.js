'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name must be provided.'},
        notEmpty: {msg: 'Name must be provided.'},
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Type must be provided.'},
        notEmpty: {msg: 'Type must be provided.'},
      }
    },
    discount: DataTypes.STRING,
    freeItem: DataTypes.STRING,
    minimumPurchase: DataTypes.FLOAT,
    backgroundImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};