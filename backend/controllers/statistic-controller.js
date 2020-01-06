const SearchQuery = require("../models").SearchQuery;
const statisticsCreator = require("../utils/statistics-creator");

module.exports = {
  getAll(req, res) {
    return SearchQuery.findAll()
      .then((searchQueries) => {
        const statistics = statisticsCreator.create(searchQueries);
        res.status(200).send(statistics);
      })
      .catch((error) => res.status(400).send(error));
  },
};
