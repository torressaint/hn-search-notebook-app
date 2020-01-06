"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SearchResults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      loginName: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      karma: {
        type: Sequelize.STRING,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      searchNotebook: {
        type: Sequelize.INTEGER,
        references: {
          model: "SearchNotebooks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      searchQuery: {
        type: Sequelize.INTEGER,
        references: {
          model: "SearchQueries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SearchResults");
  },
};
