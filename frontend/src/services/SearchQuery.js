import axios from "axios";

import { webApi } from "../config";

export const getAll = async function() {
  const response = await axios.get(`${webApi}/searchquery`, {});

  return {
    searchQueries: response.data.searchQueries
  };
};

export const getById = async function(id) {
  const response = await axios.get(`${webApi}/searchquery/${id}`, {});

  return {
    searchQuery: response.data
  };
};

export const create = async function(searchQuery, totalNumberOfHits, date) {
  const response = await axios.post(
    `${webApi}/searchquery`,
    { queryString: searchQuery, totalNumberOfHits, date },
    {}
  );

  return {
    searchQuery: response.data
  };
};

export const removeById = async function(id) {
  await axios.delete(`${webApi}/searchquery`, { id }, {});

  return {
    id
  };
};
