import { API_RAT } from "./config.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_RAT}`,
  },
};
