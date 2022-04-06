'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasOne(models.Balance, {
        foreignKey: 'userId',
        as: 'balances',
      });
      Customer.hasMany(models.Transaction, {
        foreignKey: 'usersId',
        as: 'transactions',
      });
    }
  }
  Customer.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
