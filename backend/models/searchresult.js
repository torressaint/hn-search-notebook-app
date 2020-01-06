"use strict";
module.exports = (sequelize, DataTypes) => {
  const SearchResult = sequelize.define(
    "SearchResult",
    {
      loginName: DataTypes.STRING,
      author: DataTypes.STRING,
      karma: DataTypes.STRING,
      points: DataTypes.INTEGER,
      url: DataTypes.STRING,
      tags: DataTypes.JSON,
    },
    {},
  );
  SearchResult.associate = function(models) {
    // associations can be defined here
    SearchResult.belongsTo(models.SearchNotebook, {
      foreignKey: "searchNotebook",
      onDelete: "CASCADE",
    });
    SearchResult.belongsTo(models.SearchQuery, {
      foreignKey: "searchQuery",
      onDelete: "CASCADE",
    });
  };
  return SearchResult;
};
