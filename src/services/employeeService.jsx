// src/services/employeeService.js
import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  getAllActiveUsersPayload,
  getEmployeeImagePayload,
  getEmployeeNameAndIdPayload,
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

export const getEmployeeNameAndId = async (
  employeeName,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getEmployeeNameAndIdPayload(employeeName);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/getemployeename_and_id";
  const soapBody = createSoapEnvelope("getemployeename_and_id", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "getemployeename_and_id"
  );
  return parsedResponse;
};

export const getAllUsers = async (
  userName,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getAllUsersPayload(userName);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Get_All_Users";
  const soapBody = createSoapEnvelope("IM_Get_All_Users", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "IM_Get_All_Users"
  );
  return parsedResponse;
};

export const getAllActiveUsers = async (
  userName,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getAllActiveUsersPayload(userName);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Get_All_ActiveUsers";
  const soapBody = createSoapEnvelope("IM_Get_All_ActiveUsers", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "IM_Get_All_ActiveUsers"
  );
  return parsedResponse;
};

export const getEmployeeImage = async (
  employeeNo,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getEmployeeImagePayload(employeeNo);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/getpic_bytearray";
  const soapBody = createSoapEnvelope("getpic_bytearray", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "getpic_bytearray"
  );

  return parsedResponse;
};
