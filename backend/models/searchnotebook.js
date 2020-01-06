"use strict";
module.exports = (sequelize, DataTypes) => {
  const SearchNotebook = sequelize.define(
    "SearchNotebook",
    {
      title: DataTypes.STRING,
    },
    {},
  );
  SearchNotebook.associate = function(models) {
    // associations can be defined here
    SearchNotebook.hasMany(models.SearchResult, {
      foreignKey: "searchNotebook",
      as: "searchResults",
      onDelete: "CASCADE",
    });
  };
  return SearchNotebook;
};
