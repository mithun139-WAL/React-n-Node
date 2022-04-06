'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Balance.belongsTo(models.Customer, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Balance.init(
    {
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Balance',
    }
  );
  return Balance;
};
