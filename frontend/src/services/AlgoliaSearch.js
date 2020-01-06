import axios from "axios";

import { algoliaHNSearchApi } from "../config";
import * as requestCreator from "../utils/RequestCreator";

export const find = async function(filter, fieldsToSearch, page, rowsPerPage) {
  const query = requestCreator.createGetRequest(
    `${algoliaHNSearchApi}/search`,
    filter,
    fieldsToSearch,
    page,
    rowsPerPage
  );

  const response = await axios.get(query, {});

  return {
    results: response.data.hits,
    query,
    itemsCount: response.data.nbHits,
    pagesCount: response.data.nbPages
  };
};
