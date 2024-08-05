"use client";

const { BASE_URL } = require("./src/utils/apiClient");

export default function myImageLoader({ src, width, quality }) {
  return `${BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
}
