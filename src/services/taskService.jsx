import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  createNewTaskPayload,
  getUserTasksPayload,
  updateUserTasksPayload,
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

export const createNewTask = async (
  taskData,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);

  // Build the payload dynamically using the builder function
  const payload = createNewTaskPayload(taskData);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Task_Create";
  const soapBody = createSoapEnvelope("IM_Task_Create", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);

  const parsedResponse = parseDataModelResponse(soapResponse, "IM_Task_Create");
  return parsedResponse;
};

export const getUserTasks = async (
  userName,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);

  const payload = getUserTasksPayload(userName);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Get_User_Tasks";
  const soapBody = createSoapEnvelope("IM_Get_User_Tasks", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "IM_Get_User_Tasks"
  );
  return parsedResponse;
};

export const updateUserTasks = async (
  taskUpdateData,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);

  const payload = updateUserTasksPayload(taskUpdateData);

  console.log("payload", payload);
  

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Task_Update";
  const soapBody = createSoapEnvelope("IM_Task_Update", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);

  const parsedResponse = parseDataModelResponse(soapResponse, "IM_Task_Update");
  return parsedResponse;
};
