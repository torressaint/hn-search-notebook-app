import axios from "axios";

import { webApi } from "../config";

export const getAll = async function() {
  const response = await axios.get(`${webApi}/statistics`, {});

  return response.data;
};
