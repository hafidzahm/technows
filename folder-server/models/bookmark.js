'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "UserId is required"
        },
        notNull:{
          msg: "UserId is required"
        }
      }
    },
    key: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Key is required"
        },
        notNull:{
          msg: "Key is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};