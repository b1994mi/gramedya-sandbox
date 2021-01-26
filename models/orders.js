'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders.init({
    id: {
      type: DataTypes.INTEGER(11)
      , primaryKey: true
      , autoIncrement: true
    }
    , users_id: DataTypes.INTEGER(11)
    , books_id: {
      type: DataTypes.INTEGER(11)
      , references: 'books' // <<< Note, its table's name, not object name
      , referencesKey: 'id' // <<< Note, its a column name
    }
    , qty: DataTypes.INTEGER(11)
    , order_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};