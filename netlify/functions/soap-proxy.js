const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the request body expecting JSON with soapAction and soapBody.
    const { soapAction, soapBody } = JSON.parse(event.body);

    if (!soapAction || !soapBody) {
      return {
        statusCode: 400,
        body: "Missing soapAction or soapBody in the request.",
      };
    }

    const response = await axios.post(
      "https://cloud.istreams-erp.com:4439/iStreamsSmartPublic.asmx",
      soapBody,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: soapAction,
        },
      }
    );

    return {
      statusCode: 200,
      // Wrap the SOAP response in a JSON object.
      body: JSON.stringify({ data: response.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
