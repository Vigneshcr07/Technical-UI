import { API_CONSTANTS } from "./utils/PathConstants";
import { FETCH } from "./utils/Fetch";
const { API, METHOD } = API_CONSTANTS;

export const ADD_LOGIN = async (body) => {
    let options = {
      url: `${API}/api/login`,
      method: METHOD.POST,
      body: JSON.stringify(body),
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

  export const CREATE_EMPLOYEE = async (body) => {
    let options = {
      url: `${API}/api/employees/create`,
      method: METHOD.POST,
      body: JSON.stringify(body),
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

  export const GET_ALL_EMPLOYEE = async () => {
    let options = {
      url: `${API}/api/employees/view`,
      method: METHOD.GET,
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

  export const GET_EMPLOYEE = async (id) => {
    let options = {
      url: `${API}/api/employees/view/${id}`,
      method: METHOD.GET,
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

  export const UPDATE_EMPLOYEE = async (body, id) => {
    let options = {
      url: `${API}/api/employees/update/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(body),
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

  export const DELETE_EMPLOYEE = async (id) => {
    let options = {
      url: `${API}/api/employees/delete/${id}`,
      method: METHOD.DELETE,
    };
  
    let Response = await FETCH(options);
  
    return Response;
  };

