"use strict";
module.exports = (sequelize, DataTypes) => {
  const SearchQuery = sequelize.define(
    "SearchQuery",
    {
      queryString: DataTypes.STRING,
      totalNumberOfHits: DataTypes.INTEGER,
    },
    {},
  );
  SearchQuery.associate = function(models) {
    // associations can be defined here
    SearchQuery.hasMany(models.SearchResult, {
      foreignKey: "searchQuery",
      as: "searchResults",
    });
  };
  return SearchQuery;
};
