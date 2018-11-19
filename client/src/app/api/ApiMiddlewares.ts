import { HttpStatusCodeMiddleware } from "app/api/HttpStatusCodeMiddleware";
//TODO : adding Error middleware to handle error on http request ex : error message, logging
//TODO : adding Request middleware to handle event before request ex : loading

export const apiMiddleware = (dispatch) => {return [HttpStatusCodeMiddleware(dispatch)];}
