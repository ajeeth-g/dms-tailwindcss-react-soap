import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  createDmsMasterPayload,
  verifyauthenticationPayload,
} from "./payloadBuilders";
import soapClient from "./soapClient";

// Helper: Use proxy endpoint if in development.
// const getEndpoint = (dynamicURL) => {
//   if (
//     process.env.NODE_ENV === "development" &&
//     dynamicURL &&
//     dynamicURL.includes("103.168.19.35")
//   ) {
//     return "/api";
//   }
//   return dynamicURL;
// };

// const DEFAULT_SOAP_URL = "/api";

// verifyauthentication.
export const verifyauthentication = async (userDetails, email, endpoint) => {
  const finalEndPoint =
    "https://cloud.istreams-erp.com:4438/iStreamsSmartService.asmx";
  // Build the payload dynamically using the builder function
  const payload = verifyauthenticationPayload(userDetails);

  const doConnectionResponse = await doConnection(finalEndPoint, email);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/verifyauthentication";
  const soapBody = createSoapEnvelope("verifyauthentication", payload);

  const soapResponse = await soapClient(finalEndPoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "verifyauthentication"
  );
  return parsedResponse;
};
