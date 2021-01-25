'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, books }) {
      users.belongsToMany(books, {
        through: "orders"
        , foreignKey: "users_id"
      });
    }
  };
  users.init({
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    }
    , name: DataTypes.STRING
    , address: DataTypes.STRING
    , phone: DataTypes.STRING
    , gender: DataTypes.STRING(10)
  }, {
    sequelize
    , modelName: 'users'
  });
  return users;
};