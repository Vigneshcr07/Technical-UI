export const API_URL = {
    LOCAL: "http://192.168.1.123:5000",
  };
  
  export const API_CONSTANTS = {
    API: process.env.REACT_APP_API_URL || API_URL["LOCAL"],
    METHOD: {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
    },
  };
   