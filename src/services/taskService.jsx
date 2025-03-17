import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  createNewTaskPayload,
  getUserTasksPayload,
  updateUserTasksPayload,
} from "./payloadBuilders";
import soapClient from "./soapClient";

export const createNewTask = async (
  taskData,
  loginUserName,
  dynamicClientUrl
) => {
  // Build the payload dynamically using the builder function
  const payload = createNewTaskPayload(taskData);

  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );

  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Task_Create";
  const soapBody = createSoapEnvelope("IM_Task_Create", payload);

  console.log(soapBody);
  
  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );

  const parsedResponse = parseDataModelResponse(soapResponse, "IM_Task_Create");
  return parsedResponse;
};

export const getUserTasks = async (
  userName,
  loginUserName,
  dynamicClientUrl
) => {
  const payload = getUserTasksPayload(userName);

  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Get_User_Tasks";
  const soapBody = createSoapEnvelope("IM_Get_User_Tasks", payload);

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "IM_Get_User_Tasks"
  );
  return parsedResponse;
};

export const updateUserTasks = async (
  taskUpdateData,
  loginUserName,
  dynamicClientUrl
) => {
  const payload = updateUserTasksPayload(taskUpdateData);

  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/IM_Task_Update";
  const soapBody = createSoapEnvelope("IM_Task_Update", payload);

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );

  const parsedResponse = parseDataModelResponse(soapResponse, "IM_Task_Update");
  return parsedResponse;
};
