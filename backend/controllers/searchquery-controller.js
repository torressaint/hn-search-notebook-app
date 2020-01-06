const SearchQuery = require("../models").SearchQuery;

module.exports = {
  create(req, res) {
    console.log("Saving search query");
    const { queryString, totalNumberOfHits, date } = req.body;

    return SearchQuery.create({
      queryString,
      totalNumberOfHits,
      date,
    })
      .then((searchQuery) => res.status(201).send(searchQuery.dataValues))
      .catch((error) => res.status(400).send(error));
  },
  getAll(req, res) {
    return SearchQuery.findAll()
      .then((searchQueries) => res.status(200).send(searchQueries))
      .catch((error) => res.status(400).send(error));
  },
};
