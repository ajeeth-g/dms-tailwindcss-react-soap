import soapClient from "./soapClient";
import { createSoapEnvelope, parseDataModelResponse } from "../utils/soapUtils";
import { getDataModelPayload } from "./payloadBuilders";
import { doConnection } from "./connectionService";

export const getDataModel = async (para, loginUserName, dynamicClientUrl) => {
  const payload = getDataModelPayload(para);

  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );
  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DataModel_GetData";
  const soapBody = createSoapEnvelope("DataModel_GetData", payload);

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DataModel_GetData"
  );

  return parsedResponse;
};


export const getDataModelFromQueryService = async (payload, loginUserName, dynamicClientUrl) => {
  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );

  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DataModel_GetDataFrom_Query";
  const soapBody = createSoapEnvelope("DataModel_GetDataFrom_Query", payload);

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DataModel_GetDataFrom_Query"
  );

  return parsedResponse;
};

export const saveDataService = async (
  payload,
  loginUserName,
  dynamicClientUrl
) => {
  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );

  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DataModel_SaveData";
  const soapBody = createSoapEnvelope(
    "DataModel_SaveData",
    payload
  );

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );

  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DataModel_SaveData"
  );
  return parsedResponse;
};

export const deleteDataModelService = async (
  payload,
  loginUserName,
  dynamicClientUrl
) => {
  const doConnectionResponse = await doConnection(
    loginUserName,
    dynamicClientUrl
  );

  if (doConnectionResponse === "ERROR") {
    throw new Error("Connection failed: Unable to authenticate.");
  }

  const SOAP_ACTION = "http://tempuri.org/DataModel_DeleteData";
  const soapBody = createSoapEnvelope(
    "DataModel_DeleteData",
    payload
  );

  const soapResponse = await soapClient(
    dynamicClientUrl,
    SOAP_ACTION,
    soapBody
  );
  const parsedResponse = parseDataModelResponse(
    soapResponse,
    "DataModel_DeleteData"
  );
  return parsedResponse;
};
