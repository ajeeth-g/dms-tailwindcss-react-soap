import soapClient from "./soapClient";
import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { getDataModelPayload } from "./payloadBuilders";
import { doConnection } from "./connectionService";

// Helper: Use proxy endpoint if in development.
const getEndpoint = (dynamicURL) => {
  if (
    process.env.NODE_ENV === "development" &&
    dynamicURL &&
    dynamicURL.includes("103.168.19.35")
  ) {
    return "/api";
  }
  return dynamicURL;
};

const DEFAULT_SOAP_URL = "/api";

export const getDataModel = async (
  para,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  
  const endpoint = getEndpoint(dynamicURL);
  // Build the payload dynamically using the builder function
  const payload = getDataModelPayload(para);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DataModel_GetData";
  const soapBody = createSoapEnvelope("DataModel_GetData", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DataModel_GetData"
  );

  return parsedResponse;
};
