import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { doConnection } from "./connectionService";
import {
  createDmsMasterPayload,
  deleteDMSDetailsPayload,
  deleteDMSMasterPayload,
  getDocMasterListPayloadPayload,
  updateDmsAssignedToPayload,
  updateDmsVerifiedAndAssignedToPayload,
  updateDmsVerifiedByPayload,
  updateRejectDmsDetailsPayload,
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

export const createAndSaveDMSMaster = async (
  formData,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);

  // Build the payload dynamically using the builder function
  const payload = createDmsMasterPayload(formData);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_CreateAndSave_DMS_Master";
  const soapBody = createSoapEnvelope("DMS_CreateAndSave_DMS_Master", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_CreateAndSave_DMS_Master"
  );
  return parsedResponse;
};

export const createAndSaveDMSDetails = async (
  payload,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_CreateAndSave_DMS_Details";
  const soapBody = createSoapEnvelope("DMS_CreateAndSave_DMS_Details", payload);
  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_CreateAndSave_DMS_Details"
  );
  return parsedResponse;
};

export const updateDmsVerifiedBy = async (
  data,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = updateDmsVerifiedByPayload(data);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Update_VerifiedBy";
  const soapBody = createSoapEnvelope("DMS_Update_VerifiedBy", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Update_VerifiedBy"
  );
  return parsedResponse;
};

export const updateDmsAssignedTo = async (
  data,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = updateDmsAssignedToPayload(data);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Update_AssignedTo";
  const soapBody = createSoapEnvelope("DMS_Update_AssignedTo", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Update_AssignedTo"
  );
  return parsedResponse;
};

export const updateDmsVerifiedAndAssignedTo = async (
  data,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = updateDmsVerifiedAndAssignedToPayload(data);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Update_VerifiedAndAssignedTo";
  const soapBody = createSoapEnvelope(
    "DMS_Update_VerifiedAndAssignedTo",
    payload
  );

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Update_VerifiedAndAssignedTo"
  );
  return parsedResponse;
};

export const updateRejectDmsDetails = async (
  rejectData,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = updateRejectDmsDetailsPayload(rejectData);

  // Authenticate via doConnection using the chosen endpoint.
  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Update_Rejection";
  const soapBody = createSoapEnvelope("DMS_Update_Rejection", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Update_Rejection"
  );
  return parsedResponse;
};

export const getDocMasterList = async (
  parameter,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = getDocMasterListPayloadPayload(parameter);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_GetDocMaster_List";
  const soapBody = createSoapEnvelope("DMS_GetDocMaster_List", payload);

  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_GetDocMaster_List"
  );
  return parsedResponse;
};

export const deleteDMSMaster = async (
  parameter,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = deleteDMSMasterPayload(parameter);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Delete_DMS_Master";
  const soapBody = createSoapEnvelope("DMS_Delete_DMS_Master", payload);
  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Delete_DMS_Master"
  );
  return parsedResponse;
};

export const deleteDMSDetails = async (
  parameter,
  loginUserName,
  dynamicURL = DEFAULT_SOAP_URL
) => {
  const endpoint = getEndpoint(dynamicURL);
  const payload = deleteDMSDetailsPayload(parameter);

  const doConnectionResponse = await doConnection(endpoint, loginUserName);
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DMS_Delete_DMS_Detail";
  const soapBody = createSoapEnvelope("DMS_Delete_DMS_Detail", payload);
  const soapResponse = await soapClient(endpoint, SOAP_ACTION, soapBody);
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DMS_Delete_DMS_Detail"
  );
  return parsedResponse;
};
