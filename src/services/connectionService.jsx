// src/services/connectionService.js
import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import soapClient from "./soapClient";

export const doConnection = async (dynamicClientUrl, loginUserName) => {
  if (!loginUserName) {
    console.error(
      "❌ Login user name is required for doConnection authentication."
    );
    return "ERROR";
  }

  const SOAP_ACTION = "http://tempuri.org/doConnection";
  // Using your connectionPayload builder
  const payload = { LoginUserName: loginUserName };
  const soapBody = createSoapEnvelope("doConnection", payload);
  const responseText = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );
  const result = parseDataModelResponse(responseText, "doConnection");
  return result;
};
