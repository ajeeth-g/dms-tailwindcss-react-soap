import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  FileQuestion,
  FileText,
  Folder,
  Hash,
  Link,
  Loader,
  LocateFixed,
  MessageSquare,
  UserRound,
  View,
  X,
} from "lucide-react";

import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { getDataModel } from "../services/dataService";
import {
  createAndSaveDMSMaster,
  updateDmsVerifiedBy,
} from "../services/dmsService";
import { convertServiceDate } from "../utils/dateUtils";
import { getFileIcon } from "../utils/getFileIcon";
import Button from "./common/Button";
import LoadingSpinner from "./common/LoadingSpinner";
import RejectModal from "./RejectModal";

const DocumentForm = ({
  modalRefForm,
  selectedDocument,
  docMode,
  onSuccess,
}) => {
  const { userData } = useAuth();

  // Centralized initial form state
  const initialFormState = {
    REF_SEQ_NO: -1,
    DOCUMENT_NO: "",
    DOCUMENT_DESCRIPTION: "",
    DOC_SOURCE_FROM: "",
    DOC_RELATED_TO: "",
    DOC_RELATED_CATEGORY: "",
    DOC_REF_VALUE: "",
    USER_NAME: userData.currentUserName,
    COMMENTS: "",
    DOC_TAGS: "",
    FOR_THE_USERS: "",
    EXPIRY_DATE: "",
    REF_TASK_ID: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [dmsMasterData, setDmsMasterData] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [existingDocs, setExistingDocs] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const modalRefReject = useRef(null);

  useEffect(() => {
    if (docMode === "view" || docMode === "verify") {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [docMode]);

  useEffect(() => {
    if (selectedDocument && selectedDocument.REF_SEQ_NO !== -1) {
      setFormData({
        ...initialFormState,
        ...selectedDocument,
      });
    }
  }, [selectedDocument, userData.currentUserName]);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategoryDataModel = async () => {
      try {
        const response = await getDataModel(
          {
            dataModelName: "SYNM_DMS_DOC_CATEGORIES",
            whereCondition: "",
            orderby: "",
          },
          userData.currentUserLogin
        );

        // Ensure the data is an array.
        let data = Array.isArray(response) ? response : response.data;
        if (!Array.isArray(data)) {
          data = [data];
        }
        setCategoryData(data);
      } catch (err) {
        console.error("Error fetching data model:", err);
      }
    };
    fetchCategoryDataModel();
  }, [userData.currentUserLogin]);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchDmsMasterDataModel = async () => {
      try {
        const response = await getDataModel(
          {
            dataModelName: "SYNM_DMS_MASTER",
            whereCondition: "",
            orderby: "",
          },
          userData.currentUserLogin
        );
        setDmsMasterData(response);
      } catch (err) {
        console.error("Error fetching data model:", err);
      }
    };
    fetchDmsMasterDataModel();
  }, [userData.currentUserLogin]);

  // Fetch existing documents and categories
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDocument?.REF_SEQ_NO) return;

      setIsLoadingDocs(true);
      // setFetchError("");

      try {
        // Fetch existing documents
        const docsResponse = await getDataModel(
          {
            dataModelName: "SYNM_DMS_DETAILS",
            whereCondition: `REF_SEQ_NO = ${selectedDocument.REF_SEQ_NO}`,
            orderby: "",
          },
          userData.currentUserLogin
        );

        // Handle different response formats
        const receivedDocs = Array.isArray(docsResponse)
          ? docsResponse
          : docsResponse?.Data || [];

        setExistingDocs(receivedDocs);
      } catch (err) {
        console.error("Fetch error:", err);
        // setFetchError("Failed to load documents");
      } finally {
        setIsLoadingDocs(false);
      }
    };

    fetchData();
  }, [selectedDocument?.REF_SEQ_NO, userData.currentUserLogin]);

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.DOCUMENT_NO.trim())
      newErrors.DOCUMENT_NO = "Document Ref No is required";
    if (!formData.DOCUMENT_DESCRIPTION.trim())
      newErrors.DOCUMENT_DESCRIPTION = "Document Name is required";
    if (!formData.DOC_RELATED_TO.trim())
      newErrors.DOC_RELATED_TO = "Related To is required";
    if (!formData.DOC_RELATED_CATEGORY.trim())
      newErrors.DOC_RELATED_CATEGORY = "Related Category is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleViewDocs = async (selectedDocs) => {
    try {
      const response = await getDataModel(
        {
          dataModelName: "SYNM_DMS_DETAILS",
          whereCondition: `REF_SEQ_NO = ${selectedDocs.REF_SEQ_NO} AND SERIAL_NO = ${selectedDocs.SERIAL_NO}`,
          orderby: "",
        },
        userData.currentUserLogin
      );

      if (!response?.length) {
        throw new Error("No documents found.");
      }

      // Since only one document is expected, take the first result.
      const doc = response[0];
      if (Array.isArray(doc.DOC_DATA)) {
        const blob = new Blob([new Uint8Array(doc.DOC_DATA)], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          doc.DOC_NAME || `document_${selectedDocs.REF_SEQ_NO}.bin`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error downloading documents:", err);
    }
  };

  const handleVerifyApprove = async () => {
    try {
      if (userData.currentUserName === selectedDocument?.USER_NAME) {
        alert("Access Denied: This document is created by you.");
        return;
      } else if (existingDocs.length === 0) {
        alert("Warning: No documents found");
        return;
      }

      const verifyAndAssignPayload = {
        userName: userData.currentUserName,
        refSeqNo: selectedDocument.REF_SEQ_NO,
      };

      const responseVerify = await updateDmsVerifiedBy(
        verifyAndAssignPayload,
        userData.currentUserLogin
      );

      if (responseVerify === "SUCCESS") {
        onSuccess(selectedDocument.REF_SEQ_NO, userData.currentUserName);
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleReject = async () => {
    if (userData.currentUserName === selectedDocument?.USER_NAME) {
      alert("Access Denied: This document is created by you.");
      return;
    }

    if (!showRejectModal) {
      setShowRejectModal(true);
    }
  };

  // Once the RejectModal is mounted, open it automatically
  useEffect(() => {
    if (showRejectModal && modalRefReject.current) {
      modalRefReject.current.showModal();
    }
  }, [showRejectModal]);

  const canCurrentUserEdit = (doc) => {
    if (!doc) return "";

    if (doc?.USER_NAME !== userData.currentUserName)
      return "Access Denied:This document is created by another user.";

    const status = doc?.DOCUMENT_STATUS?.toUpperCase();
    if (status === "VERIFIED")
      return "Access Denied: This document has been verified and approved for processing.";
    if (status === "AWAITING FOR USER ACCEPTANCE")
      return `Access Denied: This document has been assigned to ${doc.ASSIGNED_USER}.`;
    if (status === "IN PROGRESS")
      return "Access Denied: This document is in progress status.";
    if (status === "COMPLETED")
      return "Access Denied: This document has been processed and completed.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editError = canCurrentUserEdit(selectedDocument);
    if (editError) {
      alert(editError);
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Do not submit if there are errors
    }
    setIsSubmitting(true);
    try {
      const response = await createAndSaveDMSMaster(
        formData,
        userData.currentUserLogin
      );
      if (response) {
        // Reset form but retain the next reference number
        setFormData(initialFormState);
        modalRefForm.current?.close();
      } else {
        console.error("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.log(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <dialog
        ref={modalRefForm}
        id="document-form"
        name="document-form"
        className="modal"
      >
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-xl">
              Reference ID :
              <span className="badge badge-primary ml-1">
                {formData.REF_SEQ_NO === -1 ? "(New)" : formData.REF_SEQ_NO}
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => modalRefForm.current.close()}
              >
                <X />
              </button>
            </div>
          </div>
          <div className="divider my-1"></div>

          <form onSubmit={handleSubmit} id="document-form" name="document-form">
            <div className="grid grid-cols-3 gap-1 mx-2">
              {/* Left Side - Document Form */}
              <div className="col-span-2">
                <div className="max-h-[450px] overflow-y-auto min-h-0 p-2">
                  {/* Fields Section */}
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    {/* Document Number */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <Hash className="h-4 w-4" />
                        <label htmlFor="DOCUMENT_NO" className="text-xs">
                          Document Ref No
                        </label>
                        <div
                          className="tooltip tooltip-right"
                          data-tip="Internal reference number refers either Employee Name, Employee Number, or Project Code."
                        >
                          <FileQuestion className="w-4 h-4" />
                        </div>
                      </div>
                      <input
                        type="text"
                        name="DOCUMENT_NO"
                        id="DOCUMENT_NO"
                        placeholder="Enter document ref no"
                        value={formData.DOCUMENT_NO}
                        onChange={handleChange}
                        className="input input-bordered input-sm w-full"
                        readOnly={isReadOnly}
                      />
                      {errors.DOCUMENT_NO && (
                        <p className="text-red-500 text-xs">
                          {errors.DOCUMENT_NO}
                        </p>
                      )}
                    </div>

                    {/* Document Name */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <label
                          htmlFor="DOCUMENT_DESCRIPTION"
                          className="text-xs"
                        >
                          Document Name
                        </label>
                      </div>
                      <input
                        type="text"
                        name="DOCUMENT_DESCRIPTION"
                        id="DOCUMENT_DESCRIPTION"
                        placeholder="Enter document name"
                        value={formData.DOCUMENT_DESCRIPTION}
                        onChange={handleChange}
                        className="input input-bordered input-sm w-full"
                        readOnly={isReadOnly}
                      />
                      {errors.DOCUMENT_DESCRIPTION && (
                        <p className="text-red-500 text-xs">
                          {errors.DOCUMENT_DESCRIPTION}
                        </p>
                      )}
                    </div>

                    {/* Related To */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <Link className="h-4 w-4" />
                        <label htmlFor="DOC_RELATED_TO" className="text-xs">
                          Related To
                        </label>
                      </div>

                      <select
                        name="DOC_RELATED_TO"
                        id="DOC_RELATED_TO"
                        value={formData.DOC_RELATED_TO}
                        onChange={handleChange}
                        className="select select-bordered select-sm w-full"
                        disabled={isReadOnly}
                      >
                        <option value="" disabled>
                          Select related to
                        </option>
                        <option value="HR">HR</option>
                        <option value="Accounts">Accounts</option>
                        <option value="QS">QS</option>
                        <option value="Estimation">Estimation</option>
                        <option value="Projects">Projects</option>
                      </select>
                      {errors.DOC_RELATED_TO && (
                        <p className="text-red-500 text-xs">
                          {errors.DOC_RELATED_TO}
                        </p>
                      )}
                    </div>

                    {/* Related Category */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <Folder className="h-4 w-4" />
                        <label
                          htmlFor="DOC_RELATED_CATEGORY"
                          className="text-xs"
                        >
                          Related Category
                        </label>
                      </div>
                      <select
                        name="DOC_RELATED_CATEGORY"
                        id="DOC_RELATED_CATEGORY"
                        value={formData.DOC_RELATED_CATEGORY}
                        onChange={handleChange}
                        className="select select-bordered select-sm w-full"
                        disabled={isReadOnly}
                      >
                        <option value="" disabled>
                          Select related category
                        </option>
                        {Array.isArray(categoryData) &&
                          categoryData.map((category) =>
                            category && category.CATEGORY_NAME ? (
                              <option
                                key={category.CATEGORY_NAME}
                                value={category.CATEGORY_NAME}
                              >
                                {category.CATEGORY_NAME}
                              </option>
                            ) : null
                          )}
                      </select>
                      {errors.DOC_RELATED_CATEGORY && (
                        <p className="text-red-500 text-xs">
                          {errors.DOC_RELATED_CATEGORY}
                        </p>
                      )}
                    </div>

                    {/* Expiry Date */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <label htmlFor="EXPIRY_DATE" className="text-xs">
                          Expiry Date
                        </label>
                      </div>
                      <input
                        type="date"
                        name="EXPIRY_DATE"
                        id="EXPIRY_DATE"
                        value={formData.EXPIRY_DATE}
                        onChange={handleChange}
                        className="input input-bordered input-sm w-full"
                        readOnly={isReadOnly}
                      />
                    </div>

                    {/* Document Reference Value */}
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <LocateFixed className="h-4 w-4" />
                        <label htmlFor="DOC_REF_VALUE" className="text-xs">
                          Document Reference Value
                        </label>
                      </div>
                      <input
                        type="text"
                        name="DOC_REF_VALUE"
                        id="DOC_REF_VALUE"
                        placeholder="Enter docs ref no"
                        value={formData.DOC_REF_VALUE}
                        onChange={handleChange}
                        className="input input-bordered input-sm w-full"
                        readOnly={isReadOnly}
                      />
                    </div>

                    {/* Remarks */}
                    <div className="flex flex-wrap items-center gap-3 w-full col-span-2">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <label htmlFor="COMMENTS" className="text-xs">
                          Remarks
                        </label>
                      </div>
                      <textarea
                        type="text"
                        name="COMMENTS"
                        id="COMMENTS"
                        placeholder="Add remarks"
                        value={formData.COMMENTS}
                        onChange={handleChange}
                        className="textarea textarea-bordered textarea-xs w-full"
                        readOnly={isReadOnly}
                      ></textarea>
                    </div>
                  </div>

                  {docMode ? (
                    ""
                  ) : (
                    <div className="modal-action">
                      <button type="submit" className="btn btn-primary">
                        {formData.REF_SEQ_NO === -1
                          ? "Create Document"
                          : "Save Changes"}

                        {isSubmitting ? (
                          <LoadingSpinner className="loading loading-spinner loading-md" />
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Activity Section */}
              <div className="col-span-1 rounded-lg p-4 shadow-2xl max-h-[400px] overflow-y-auto min-h-0">
                <h2 className="text-base font-medium mb-3">Others Details:</h2>

                {/* Fields Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <UserRound className="h-4 w-4" />
                      <label className="text-sm">Uploader Name</label>
                    </div>
                    <p className="text-sm font-medium">
                      {formData.REF_SEQ_NO === -1
                        ? userData.currentUserName
                        : selectedDocument.USER_NAME}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <LocateFixed className="h-4 w-4" />
                      <label className="text-sm">Document Received From</label>
                    </div>
                    <p className="text-sm font-medium">
                      {formData.DOC_SOURCE_FROM}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <LocateFixed className="h-4 w-4" />
                      <label className="text-sm">Verified by</label>
                    </div>
                    <p className="text-sm font-medium">
                      {formData.VERIFIED_BY}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock3 className="h-4 w-4" />
                      <label className="text-sm">Verified date</label>
                    </div>
                    <p className="text-sm font-medium">
                      {convertServiceDate(formData.VERIFIED_DATE)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <LocateFixed className="h-4 w-4" />
                      <label className="text-sm">Reference Task ID</label>
                    </div>
                    <p className="text-sm font-medium">
                      {formData.REF_TASK_ID}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Loader className="h-4 w-4" />
                      <label className="text-sm">Document Status</label>
                    </div>
                    <p className="badge badge-error text-xs font-medium">
                      {formData.DOCUMENT_STATUS}
                    </p>
                  </div>

                  {docMode === "verify" && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        icon={<CircleCheckBig size={18} />}
                        label="Verified & Approve"
                        className="btn btn-success btn-sm"
                        onClick={handleVerifyApprove}
                      />

                      <Button
                        type="button"
                        icon={<X size={18} />}
                        label="Reject"
                        className="btn btn-error btn-outline btn-sm flex-1"
                        onClick={handleReject}
                      />
                    </div>
                  )}
                </div>
              </div>

              {docMode === "view" || docMode === "verify" ? (
                isLoadingDocs ? (
                  <LoadingSpinner />
                ) : existingDocs.length > 0 ? (
                  <div className="col-span-3">
                    <div className="divider my-1"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {existingDocs.map((doc) => (
                        <div
                          key={`${doc.REF_SEQ_NO}-${doc.SERIAL_NO}`}
                          className="card card-compact bg-neutral text-neutral-content rounded-lg"
                        >
                          <div className="card-body">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              {/* Left Section - Icon + Text */}
                              <div className="flex items-start gap-2 min-w-0">
                                <img
                                  src={getFileIcon(doc.DOC_EXT)}
                                  alt="Document type"
                                  className="w-8 h-8 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-md font-medium md:truncate break-words">
                                    {doc.DOC_NAME.length > 24
                                      ? doc.DOC_NAME.substring(0, 23) + "..."
                                      : doc.DOC_NAME}
                                  </h5>
                                  <div className="text-xs text-gray-400">
                                    <span>Type: {doc.DOC_EXT}</span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                icon={<View size={14} />}
                                label="View"
                                className="btn btn-primary btn-xs"
                                onClick={() => handleViewDocs(doc)}
                                tooltip="View"
                                variant="ghost"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="col-span-3 text-xs text-center text-gray-500">
                    <div className="divider my-1"></div>
                    No documents found for this reference no
                  </div>
                )
              ) : null}
            </div>
          </form>
        </div>
      </dialog>

      {showRejectModal && (
        <RejectModal
          modalRefReject={modalRefReject}
          selectedDocument={selectedDocument}
        />
      )}
    </>
  );
};

export default DocumentForm;
