const SearchNotebook = require("../models").SearchNotebook;
const SearchResult = require("../models").SearchResult;
const SearchQuery = require("../models").SearchQuery;
const _ = require("lodash");

module.exports = {
  create(req, res) {
    const { title } = req.body;

    return SearchNotebook.create({
      title,
    })
      .then((searchNotebook) => {
        res.status(201).send(searchNotebook.dataValues);
      })
      .catch((error) => res.status(400).send(error));
  },
  getAll(req, res) {
    return SearchNotebook.findAll({
      include: [
        {
          model: SearchResult,
          as: "searchResults",
          include: [{ model: SearchQuery, as: "SearchQuery" }],
        },
      ],
    })
      .then((searchNotebooks) => {
        res.status(200).send(searchNotebooks);
      })
      .catch((error) => res.status(400).send(error));
  },
  removeById(req, res) {
    const { id } = req.params;

    return SearchNotebook.destroy({ where: { id } })
      .then((id) => res.sendStatus(200))
      .catch((error) => res.status(400).send(error));
  },
};
