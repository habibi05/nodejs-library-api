'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {

    static associate(models) {
      this.hasMany(models.Book, {
        foreignKey: 'author_id',
        as: 'books',
      });
    }
    
  }
  Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    birth_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};