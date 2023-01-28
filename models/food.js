'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.hasMany(models.Order)
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name must be provided.'},
        notEmpty: {msg: 'Name must be provided.'},
      }
    },
    toppings: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Price must be provided.'},
        notEmpty: {msg: 'Price must be provided.'}
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Picture must be provided.'},
        notEmpty: {msg: 'Picture must be provided.'},
      }
    },
    additionalInfos: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};