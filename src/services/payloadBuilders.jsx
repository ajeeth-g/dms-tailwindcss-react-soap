export const connectionPayload = (loginUserName) => ({
  LoginUserName: loginUserName,
});

export const verifyauthenticationPayload = (userDetails) => ({
  username: userDetails.User,
  password: userDetails.Pass,
});

export const createDmsMasterPayload = (formData) => ({
  REF_SEQ_NO: formData.REF_SEQ_NO, // long
  DOCUMENT_NO: formData.DOCUMENT_NO, // string
  DOCUMENT_DESCRIPTION: formData.DOCUMENT_DESCRIPTION, // string
  DOC_SOURCE_FROM: formData.DOC_SOURCE_FROM, // string
  DOC_RELATED_TO: formData.DOC_RELATED_TO, // string
  DOC_RELATED_CATEGORY: formData.DOC_RELATED_CATEGORY, // string
  DOC_REF_VALUE: formData.DOC_REF_VALUE, // string
  USER_NAME: formData.USER_NAME, // string
  COMMENTS: formData.COMMENTS, // string
  DOC_TAGS: formData.DOC_TAGS, // string (comma-separated)
  FOR_THE_USERS: formData.FOR_THE_USERS, // string (comma-separated)
  EXPIRY_DATE: formData.EXPIRY_DATE, // string (ISO date or as required)
  REF_TASK_ID: formData.REF_TASK_ID, // long
});

export const createNewTaskPayload = (taskData) => ({
  UserName: taskData.userName,
  Subject: taskData.taskName,
  Details: taskData.taskSubject,
  RelatedTo: taskData.relatedTo,
  AssignedUser: taskData.assignedTo,
  CreatorReminderOn: taskData.creatorReminderOn,
  StartDate: taskData.assignedDate,
  CompDate: taskData.targetDate,
  RemindTheUserOn: taskData.remindOnDate,
  RefTaskID: taskData.refSeqNo,
});

export const getUserTasksPayload = (userName) => ({
  UserName: userName,
});

export const updateUserTasksPayload = (taskUpdateData) => ({
  TaskID: taskUpdateData.taskID,
  TaskStatus: taskUpdateData.taskStatus,
  StatusDateTime: taskUpdateData.statusDateTime,
  Reason: taskUpdateData.reason,
  UserName: taskUpdateData.userName,
});

export const createDmsDetailsPayload = ({
  refSeqNo,
  serialNo,
  documentNo,
  documentDescription,
  docSourceFrom,
  docRelatedTo,
  docRelatedCategory,
  docRefValue,
  userName,
  comments,
  docTags,
  forTheUsers,
  expiryDate,
  docData,
  docName,
  docExt,
  filePath,
}) => ({
  REF_SEQ_NO: refSeqNo, // long
  SERIAL_NO: serialNo, // short
  DOCUMENT_NO: documentNo, // string
  DOCUMENT_DESCRIPTION: documentDescription, // string
  DOC_SOURCE_FROM: docSourceFrom, // string
  DOC_RELATED_TO: docRelatedTo, // string
  DOC_RELATED_CATEGORY: docRelatedCategory, // string
  DOC_REF_VALUE: docRefValue, // string
  USER_NAME: userName, // string
  COMMENTS: comments, // string
  DOC_TAGS: docTags, // string (comma-separated)
  FOR_THE_USERS: forTheUsers, // string (comma-separated)
  EXPIRY_DATE: expiryDate, // string (ISO date or as required)
  DOC_DATA: docData, // base64Binary
  DOC_NAME: docName, // string
  DOC_EXT: docExt, // string
  FILE_PATH: filePath, // string
});

export const getDataModelPayload = ({
  dataModelName,
  whereCondition,
  orderby,
}) => ({
  DataModelName: dataModelName, // string
  WhereCondition: whereCondition, // string
  Orderby: orderby, // string
});

export const getEmployeeNameAndIdPayload = (userfirstname) => ({
  userfirstname: userfirstname,
});

export const getEmployeeImagePayload = (empNo) => ({
  EmpNo: empNo,
});

export const getAllUsersPayload = (userName) => ({
  UserName: userName,
});

export const getAllActiveUsersPayload = (userName) => ({
  UserName: userName,
});

export const getAllDmsActiveUserPayload = (userName) => ({
  UserName: userName,
});

export const updateDmsVerifiedByPayload = (data) => ({
  USER_NAME: data.userName,
  REF_SEQ_NO: data.refSeqNo,
});

export const updateDmsAssignedToPayload = (data) => ({
  USER_NAME: data.userName,
  ASSIGNED_TO: data.assignedTo,
  REF_SEQ_NO: data.refSeqNo,
});

export const updateDmsVerifiedAndAssignedToPayload = (data) => ({
  USER_NAME: data.userName,
  ASSIGNED_TO: data.assignedTo,
  REF_SEQ_NO: data.refSeqNo,
});

export const updateRejectDmsDetailsPayload = (data) => ({
  REF_SEQ_NO: data.ref_Seq_No,
  CURRENT_USER_NAME: data.currentUserName,
  DOCUMENT_DESCRIPTION: data.documentDescription,
  DOCUMENT_USER_NAME: data.documentUserName,
  REJECTION_REMARKS: data.rejectionRemarks,
});

export const getDocMasterListPayloadPayload = (para) => ({
  WhereCondition: para.whereCondition,
  Orderby: para.orderby,
  IncludeEmpImage: para.includeEmpImage,
});

export const deleteDMSMasterPayload = (para) => ({
  USER_NAME: para.userName,
  REF_SEQ_NO: para.refSeqNo,
});

export const deleteDMSDetailsPayload = (para) => ({
  USER_NAME: para.userName,
  REF_SEQ_NO: para.refSeqNo,
  SERIAL_NO: para.serialNo,
});

export const getDashboardOverallSummaryPayload = (noOfDays) => ({
  NoOfDays: noOfDays,
});

export const getDashboardChannelSummaryPayload = (noOfDays) => ({
  NoOfDays: noOfDays,
});
