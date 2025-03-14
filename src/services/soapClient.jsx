import axios from "axios";

axios.interceptors.request.use(
  config => {
    console.log("Request config:", config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log("Response:", response);
    return response;
  },
  error => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

const soapClient = async (url, soapAction, soapBody) => {
  try {
    const response = await axios.post(url, soapBody, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: soapAction,
      },
    });
    return response.data;
  } catch (error) {
    console.error("SOAP request error:", error);
    throw error;
  }
};

export default soapClient;
