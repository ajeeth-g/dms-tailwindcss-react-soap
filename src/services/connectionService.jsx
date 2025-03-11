// src/services/connectionService.js
import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import soapClient from "./soapClient";

// Helper: Use proxy endpoint for development if the dynamic URL is the known external one.
const getEndpoint = (dynamicURL) => {
  if (
    process.env.NODE_ENV === "development" &&
    dynamicURL &&
    dynamicURL.includes("103.168.19.35")
  ) {
    return "/api"; // Use the proxy endpoint defined in vite.config.js
  }
  return dynamicURL;
};

export const doConnection = async (endpoint = "/api", loginUserName) => {
  if (!loginUserName) {
    console.error(
      "❌ Login user name is required for doConnection authentication."
    );
    return "ERROR";
  }

  const finalEndpoint = getEndpoint(endpoint);
  const SOAP_ACTION = "http://tempuri.org/doConnection";
  // Using your connectionPayload builder
  const payload = { LoginUserName: loginUserName }; // or use connectionPayload(loginUserName) if defined
  const soapBody = createSoapEnvelope("doConnection", payload);
  const responseText = await soapClient(finalEndpoint, SOAP_ACTION, soapBody);
  const result = parseDataModelResponse(responseText, "doConnection");
  return result;
};
