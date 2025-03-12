const axios = require("axios");

exports.handler = async (event, context) => {
  // You can optionally support passing parameters through event.queryStringParameters or event.body
  // For now, we'll hardcode the SOAP action and envelope.
  const soapAction = "http://tempuri.org/doConnection";
  const soapEnvelope = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <doConnection xmlns="http://tempuri.org/">
          <LoginUserName>gopi@demo.com</LoginUserName>
        </doConnection>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const response = await axios.post(
      "https://istreamserp-001-site1.anytempurl.com/iStreamsSmartPublic.asmx",
      soapEnvelope,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": soapAction,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
