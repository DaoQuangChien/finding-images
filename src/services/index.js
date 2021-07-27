import request from "../utils/request";

export const getListImages = (params) =>
  request.get("/search/photos", {
    params,
  });
