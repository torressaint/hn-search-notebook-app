const SearchResult = require("../models").SearchResult;

module.exports = {
  create(req, res) {
    const { searchResult, notebookId, queryId } = req.body;
    const { loginName, author, karma, points, url, _tags } = searchResult;

    return SearchResult.create({
      loginName,
      author,
      karma,
      points,
      url,
      tags: _tags,
      searchNotebook: notebookId,
      searchQuery: queryId,
    })
      .then((searchResult) => res.status(201).send(searchResult))
      .catch((error) => res.status(400).send(error));
  },
  getAll(req, res) {
    return SearchResult.findAll()
      .then((searchResults) => res.status(200).send(searchResults))
      .catch((error) => res.status(400).send(error));
  },
  removeById(req, res) {
    const { id } = req.params;

    return SearchResult.destroy({ where: { id } })
      .then((id) => res.sendStatus(200))
      .catch((error) => res.status(400).send(error));
  },
};
