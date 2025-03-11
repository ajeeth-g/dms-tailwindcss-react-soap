import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DocumentForm from "../components/DocumentForm";
import TaskForm from "../components/TaskForm";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { getDocMasterList } from "../services/dmsService";
import { getAllActiveUsers } from "../services/employeeService";
import { formatDateTime } from "../utils/dateUtils";

export default function DocumentViewPage() {
  const [docsData, setDocsData] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState({});
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const modalRef = useRef(null);
  const { userData } = useAuth();
  const [verifierName, setVerifierName] = useState("");
  const [assignEnabled, setAssignEnabled] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [docFormMode, setDocFormMode] = useState("view");
  const modalRefForm = useRef(null);

  // Task assignment state
  const [taskData, setTaskData] = useState({
    userName: "",
    taskName: "",
    taskSubject: "",
    relatedTo: "",
    assignedTo: "",
    creatorReminderOn: formatDateTime(new Date(Date.now() + 2 * 86400000)), // +2 day
    assignedDate: formatDateTime(new Date()),
    targetDate: formatDateTime(new Date(Date.now() + 86400000)), // +1 day
    remindOnDate: formatDateTime(new Date(Date.now() + 2 * 86400000)), // +2 day
    refTaskID: -1,
    verifiedBy: userData.currentUserName,
  });

  // Fetch documents from master
  const fetchDmsMaster = useCallback(async () => {
    setLoadingDocs(true);
    setError(null);
    try {
      const getDocMasterListPayload = {
        whereCondition: "",
        orderby: "REF_SEQ_NO DESC",
        includeEmpImage: false,
      };
      const response = await getDocMasterList(
        getDocMasterListPayload,
        userData.currentUserLogin
      );
      setDocsData(response?.length > 0 ? response : []);
      if (!response?.length) setError("No documents available.");
    } catch (err) {
      console.error("Error fetching dms master:", err);
      setError(err.message || "Error fetching dms master.");
    } finally {
      setLoadingDocs(false);
    }
  }, [userData.currentUserLogin]);

  useEffect(() => {
    fetchDmsMaster();
  }, [fetchDmsMaster]);

  // Fetch all active users list
  const fetchUsers = useCallback(async () => {
    try {
      const userDetails = await getAllActiveUsers(
        "",
        userData.currentUserLogin
      );
      setUsers(Array.isArray(userDetails) ? userDetails : []);
    } catch (err) {
      console.error("Error fetching all active users:", err);
      setUsers([]);
    }
  }, [userData.currentUserLogin]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleVerifySuccess = useCallback((refSeqNo, verifierName) => {
    setDocsData((prevDocs) =>
      prevDocs.map((doc) =>
        doc.REF_SEQ_NO === refSeqNo
          ? { ...doc, VERIFIED_BY: verifierName }
          : doc
      )
    );
    modalRefForm.current?.close();
  }, []);

  const handleVerify = useCallback((doc) => {
    if (userData.currentUserName === doc.USER_NAME) {
      alert(
        "Access Denied: This document is created by you. You can't Verify."
      );
      return;
    }
    setSelectedDocument(doc);
    setDocFormMode("verify");
    modalRefForm.current?.showModal();
  }, []);

  const handleView = useCallback((doc) => {
    setSelectedDocument(doc);
    setDocFormMode("view");
    modalRefForm.current?.showModal();
  }, []);

  // Handle dropdown select. Now we also pass the document details.
  const handleEmployeeSelect = (doc, event) => {
    if (userData.currentUserName === doc.USER_NAME) {
      alert("Access Denied: This document is created by you.");
      return;
    } else if (doc.DOCUMENT_STATUS === "Rejected") {
      alert("Access Denied: This document has been rejected. You can't assign");
      return;
    }

    const { name, value } = event.target;
    setTaskData((prev) => ({
      ...prev,
      userName: doc.USER_NAME,
      taskName: doc.DOCUMENT_DESCRIPTION,
      relatedTo: doc.DOC_RELATED_TO,
      refSeqNo: doc.REF_SEQ_NO,
      verifiedBy: doc.VERIFIED_BY,
      [name]: value,
    }));

    modalRef.current?.showModal();
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskCreated = (newTask) => {
    // Update the state with the new task
    setTaskData((prevTasks) => ({ ...prevTasks, newTask }));
  };

  return (
    <>
      {loadingDocs ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : docsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {docsData.map((doc) => (
            <motion.div
              key={doc.REF_SEQ_NO}
              whileHover={{ scale: 1.04 }}
              className="card card-compact bg-neutral shadow-xl"
            >
              <div className="card-body">
                <div
                  className={`flex items-start gap-2 ${
                    doc.VERIFIED_BY ? "cursor-pointer" : ""
                  }`}
                  onClick={doc.VERIFIED_BY ? () => handleView(doc) : undefined}
                >
                  <div className="bg-neutral-100 p-2 rounded-lg">
                    <FileSearch className="w-4 h-4 text-neutral-900" />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-md font-semibold leading-tight truncate">
                          {doc.DOCUMENT_DESCRIPTION.length > 14
                            ? doc.DOCUMENT_DESCRIPTION.substring(0, 14) + "..."
                            : doc.DOCUMENT_DESCRIPTION}
                        </h2>
                        <p className="text-[10px] text-gray-500 leading-none">
                          {doc.DOCUMENT_NO}
                        </p>
                      </div>
                      <span className="text-xs badge badge-primary">
                        {doc.REF_SEQ_NO}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-actions flex-col items-center justify-between gap-1">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-medium">{doc.USER_NAME}</span>
                    <span className="text-xs text-gray-500">
                      {doc.NO_OF_DOCUMENTS} File(s)
                    </span>
                  </div>
                  <div className="card-actions items-start justify-between gap-2 w-full">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        {doc.VERIFIED_BY && (
                          <span
                            className={`text-xs text-gray-500 ${
                              doc.DOCUMENT_STATUS === "Rejected"
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {doc.DOCUMENT_STATUS === "Rejected"
                              ? "Rejected by"
                              : "Verified by"}
                          </span>
                        )}
                        {!doc.VERIFIED_BY && (
                          <span className="text-[9px] badge badge-error badge-outline leading-tight px-1">
                            Unverified
                          </span>
                        )}
                      </div>

                      <Button
                        className={`${
                          !doc.VERIFIED_BY
                            ? "btn btn-success btn-xs w-full"
                            : "btn btn-xs btn-active btn-ghost w-full"
                        } `}
                        label={doc.VERIFIED_BY || "Verify"}
                        onClick={
                          !doc.VERIFIED_BY ? () => handleVerify(doc) : undefined
                        }
                        disabled={!doc.VERIFIED_BY}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] text-gray-500 mb-1">
                        Assign to
                      </p>
                      <select
                        name="assignedTo"
                        className="select select-bordered select-xs text-center w-full"
                        onChange={(e) => handleEmployeeSelect(doc, e)}
                        defaultValue={doc.ASSIGNED_USER || ""}
                        disabled={!doc.VERIFIED_BY}
                      >
                        <option value="" disabled>
                          Assign to
                        </option>
                        {users.map((user) => (
                          <option key={user.user_name} value={user.user_name}>
                            {user.user_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center text-gray-400">No documents available.</p>
        </div>
      )}

      {/* Task Form Modal */}
      <TaskForm
        modalRef={modalRef}
        users={users}
        taskData={taskData}
        onTaskChange={handleTaskChange}
        onTaskCreated={handleTaskCreated}
      />

      <DocumentForm
        modalRefForm={modalRefForm}
        selectedDocument={selectedDocument}
        docMode={docFormMode}
        onSuccess={handleVerifySuccess}
      />
    </>
  );
}
