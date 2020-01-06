import axios from "axios";

import { webApi } from "../config";

export const getAll = async function() {
  const response = await axios.get(`${webApi}/searchresult`, {});

  return {
    searchResults: response.data.searchResults
  };
};

export const getById = async function(id) {
  const response = await axios.get(`${webApi}/searchresult/${id}`, {});

  return {
    searchResult: response.data.searchResult
  };
};

export const create = async function(searchResult, notebookId, queryId) {
  const response = await axios.post(
    `${webApi}/searchresult`,
    { searchResult, notebookId, queryId },
    {}
  );

  return {
    searchResult: response.data
  };
};

export const removeById = async function(searchResultId) {
  await axios.delete(`${webApi}/searchresult/${searchResultId}`, {});

  return {
    id: searchResultId
  };
};
