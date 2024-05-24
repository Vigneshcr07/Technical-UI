export const FETCH = async (options) => {
  let token = localStorage.getItem("token");
  let response = {};
  let { url, method, body, authenticate = true, authToken, newHeader } = options;

  let headers = !newHeader ? {
    "Content-Type": "application/json",
    "Accesss-Control-Allow-Origin": "*", 
    // "Content-Type": "application/vnd.ms-excel",
    ...options.headers,
  } : { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };

  if (authenticate) {
    headers = { ...headers, Authorization: authToken ?? `${token}` };
  }

  let requestOptions = { method, headers };

  if (method === "POST" || method === "PUT") {
    requestOptions = { ...requestOptions, body: body };
  }

  response = await fetch(url, requestOptions);

  if (response.ok) {
    return await response.json();
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.pathname = "/login";
  }

  let errorRes = await response.json();
  console.log(errorRes);
  const responseError = {
    type: "Error",
    message: errorRes?.response?.error || errorRes?.response?.message || "Something went wrong",
    success: errorRes?.success || false,
    invalid: errorRes?.invalid || [],
  };

  throw responseError;
};
