import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  getAllDmsActiveUserPayload,
  getDashboardChannelSummaryPayload,
  getDashboardOverallSummaryPayload
} from "./payloadBuilders";
import soapClient from "./soapClient";

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

export const getAllDmsActiveUser = async (
  userName,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getAllDmsActiveUserPayload(userName);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Get_All_ActiveUsers";
  const soapBody = createSoapEnvelope("DMS_Get_All_ActiveUsers", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Get_All_ActiveUsers"
  );
  return parsedResponse;
};

export const getDashboardOverallSummary = async (
  noOfDays,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getDashboardOverallSummaryPayload(noOfDays);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_GetDashboard_OverallSummary";
  const soapBody = createSoapEnvelope(
    "DMS_GetDashboard_OverallSummary",
    payload
  );

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_GetDashboard_OverallSummary"
  );
  return parsedResponse;
};

export const getDashboardChannelSummary = async (
  noOfDays,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getDashboardChannelSummaryPayload(noOfDays);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_GetDashboard_ChannelSummary";
  const soapBody = createSoapEnvelope(
    "DMS_GetDashboard_ChannelSummary",
    payload
  );

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_GetDashboard_ChannelSummary"
  );
  return parsedResponse;
};
