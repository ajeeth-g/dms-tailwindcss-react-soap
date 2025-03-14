import axios from "axios";

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
    if (error.response) {
      // Request made and server responded
      console.error("Response error data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export default soapClient;
