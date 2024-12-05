'use strict';
const { Model } = require('sequelize');
const Author = require('./author');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      this.belongsTo(models.Author, {
        foreignKey: 'author_id',
        as: 'author',
      });
    }

  }
  
  Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publish_date: DataTypes.DATE,
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: 'id',
        },
    },
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};