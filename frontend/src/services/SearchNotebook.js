import axios from "axios";

import { webApi } from "../config";

export const getAll = async function() {
  const response = await axios.get(`${webApi}/searchnotebook`, {});

  return {
    searchNotebooks: response.data
  };
};

export const getById = async function(id) {
  const response = await axios.get(`${webApi}/searchnotebook/${id}`, {});

  return {
    searchNotebooks: response.data.searchNotebooks
  };
};

export const create = async function(title) {
  const response = await axios.post(`${webApi}/searchnotebook`, { title }, {});

  return {
    searchNotebook: response.data.searchNotebook
  };
};

export const removeById = async function(searchNotebookId) {
  await axios.delete(`${webApi}/searchnotebook/${searchNotebookId}`, {});

  return {
    id: searchNotebookId
  };
};
