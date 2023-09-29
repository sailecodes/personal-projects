import { API_RAT } from "./config.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_RAT}`,
  },
};

export const calcTextWidthPx = (text) => {
  // FIXME: Magic number
  const font = "40px poppins";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const textWidth = context.measureText(text).width;
  const formattedWidth = Math.ceil(textWidth);

  return Number(formattedWidth);
};
