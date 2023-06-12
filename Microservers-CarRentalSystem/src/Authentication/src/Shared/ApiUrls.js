export const BaseUrl = process.env.REACT_APP_API_BASE_URL;
export const ApiVersion = "/api/v1/";


export const ApiUrls = {
  GET_CAR: BaseUrl + ApiVersion + "cars/?size=10&page=1&showAll=true",
  GET_CAR_USER : BaseUrl + ApiVersion + "cars/?size=10&page=1",
  CREATE_CAR: BaseUrl + ApiVersion + "add_car/",
  LOGIN_CAR: BaseUrl + ApiVersion + "login/",
  GET_SINGLE_CAR_DETAILS : BaseUrl + ApiVersion +"car/",
  GET_CAR_ON_RENT : BaseUrl +ApiVersion + "rental/",
  GET_ALL_USER : BaseUrl + ApiVersion + "get_all/",
  DELETE_CAR : BaseUrl+ApiVersion +"delete_car"
};



export const ApiMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
