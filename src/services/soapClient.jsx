import axios from "axios";

const soapClient = async (url, soapAction, soapBody) => {
  try {
    const response = await axios.post(
      url,
      { soapAction, soapBody },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    return response.data.data;
  } catch (error) {
    console.error("SOAP request error:", error);
    throw error;
  }
};

export default soapClient;
