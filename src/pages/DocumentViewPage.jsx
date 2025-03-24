import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DocumentForm from "../components/DocumentForm";
import TaskForm from "../components/TaskForm";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { getAllDmsActiveUser } from "../services/dashboardService";
import { getDocMasterList, updateDmsAssignedTo } from "../services/dmsService";
import { formatDateTime } from "../utils/dateUtils";

export default function DocumentViewPage() {
  const [docsData, setDocsData] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [docFormMode, setDocFormMode] = useState("view");
  const [isVAndVProcess, setIsVAndVProcess] = useState(false);
  // verifyEnabled keyed by doc id so each Verify button works independently
  const [verifyEnabled, setVerifyEnabled] = useState({});
  // assignedUsers holds the selected employee for each document
  const [assignedUsers, setAssignedUsers] = useState({});

  const modalRefTask = useRef(null);
  const modalRefForm = useRef(null);
  const { userData } = useAuth();

  // Task assignment state (for TaskForm modal)
  const [taskData, setTaskData] = useState({
    userName: userData.currentUserName,
    taskName: "",
    taskSubject: "",
    relatedTo: "",
    assignedTo: "",
    creatorReminderOn: formatDateTime(new Date(Date.now() + 2 * 86400000)), // +2 days
    assignedDate: formatDateTime(new Date()),
    targetDate: formatDateTime(new Date(Date.now() + 86400000)), // +1 day
    remindOnDate: formatDateTime(new Date()),
    refTaskID: -1,
    dmsSeqNo: 0,
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
        userData.currentUserLogin,
        userData.clientURL
      );
      setDocsData(response?.length > 0 ? response : []);
      if (!response?.length) setError("No documents available.");
    } catch (err) {
      console.error("Error fetching dms master:", err);
      setError(err.message || "Error fetching dms master.");
    } finally {
      setLoadingDocs(false);
    }
  }, [userData.currentUserLogin, userData.clientURL]);

  useEffect(() => {
    fetchDmsMaster();
  }, [fetchDmsMaster]);

  // Fetch all active users list
  const fetchUsers = useCallback(async () => {
    try {
      const userDetails = await getAllDmsActiveUser(
        userData.currentUserName,
        userData.currentUserLogin,
        userData.clientURL
      );
      setUsers(Array.isArray(userDetails) ? userDetails : []);
    } catch (err) {
      console.error("Error fetching all active users:", err);
      setUsers([]);
    }
  }, [userData.currentUserLogin, userData.clientURL, userData.currentUserName]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // When docsData changes, pre-populate assignedUsers and verifyEnabled based on data from the server
  useEffect(() => {
    const newAssigned = {};
    const newVerify = {};
    docsData.forEach((doc) => {
      if (doc.ASSIGNED_USER) {
        newAssigned[doc.REF_SEQ_NO] = doc.ASSIGNED_USER;
        newVerify[doc.REF_SEQ_NO] = true;
      }
    });
    setAssignedUsers(newAssigned);
    setVerifyEnabled(newVerify);
  }, [docsData]);

  const handleVerifySuccess = useCallback((refSeqNo, verifierName) => {
    setDocsData((prevDocs) =>
      prevDocs.map((doc) =>
        doc.REF_SEQ_NO === refSeqNo
          ? { ...doc, VERIFIED_BY: verifierName }
          : doc
      )
    );
    modalRefForm.current?.close();
    modalRefTask.current?.showModal();
  }, []);

  const handleVerify = useCallback(
    (doc) => {
      setSelectedDocument(doc);
      setDocFormMode("verify");
      modalRefForm.current?.showModal();
    },
    [userData.currentUserName]
  );

  const handleView = useCallback((doc) => {
    setSelectedDocument(doc);
    setDocFormMode("view");
    modalRefForm.current?.showModal();
  }, []);

  // Handle dropdown select for each document.
  const handleEmployeeSelect = async (doc, event) => {
    const { name, value } = event.target;

    // Update task data with document-specific info
    setTaskData((prev) => ({
      ...prev,
      taskName: doc.DOCUMENT_DESCRIPTION,
      relatedTo: doc.DOC_RELATED_TO,
      refSeqNo: doc.REF_SEQ_NO,
      dmsSeqNo: doc.REF_SEQ_NO,
      verifiedBy: doc.VERIFIED_BY,
      [name]: value,
    }));

    // Call the service to assign the document
    const assignPayload = {
      userName: userData.currentUserName,
      assignedTo: value,
      refSeqNo: doc.REF_SEQ_NO,
    };

    try {
      await updateDmsAssignedTo(
        assignPayload,
        userData.currentUserLogin,
        userData.clientURL
      );
      // On successful assignment:
      // - Store the selected employee so the dropdown shows that name.
      // - Disable the dropdown.
      // - Enable the Verify button.
      setAssignedUsers((prev) => ({ ...prev, [doc.REF_SEQ_NO]: value }));
      setVerifyEnabled((prev) => ({ ...prev, [doc.REF_SEQ_NO]: true }));
    } catch (error) {
      console.error("Error assigning document to user:", error);
      // On error, keep the dropdown enabled and disable Verify.
      setVerifyEnabled((prev) => ({ ...prev, [doc.REF_SEQ_NO]: false }));
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskCreated = (newTask) => {
    setTaskData((prevTasks) => ({ ...prevTasks, newTask }));
  };

  return (
    <>
      {loadingDocs ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : docsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {docsData.map((doc) => (
            <motion.div
              key={doc.REF_SEQ_NO}
              whileHover={{ scale: 1.04 }}
              className="card card-compact bg-base-300 shadow-md"
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
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h2 className="text-lg font-semibold leading-tight truncate">
                        {doc.DOCUMENT_DESCRIPTION.length > 25
                          ? doc.DOCUMENT_DESCRIPTION.substring(0, 25) + "..."
                          : doc.DOCUMENT_DESCRIPTION}
                      </h2>
                      <p className="text-sm text-gray-500 leading-none">
                        {doc.DOCUMENT_NO}
                      </p>
                    </div>
                    <span className="text-xs badge badge-primary">
                      {doc.REF_SEQ_NO}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-3">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-medium">{doc.USER_NAME}</span>
                    <span className="text-sm text-gray-500">
                      {doc.NO_OF_DOCUMENTS} File(s)
                    </span>
                  </div>
                  <div className="card-actions items-start justify-between gap-2 w-full">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
                        {doc.VERIFIED_BY ? (
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
                        ) : (
                          <span className="text-xs badge badge-error badge-outline leading-tight px-1">
                            Unverified
                          </span>
                        )}
                      </div>
                      <Button
                        className={`${
                          !doc.VERIFIED_BY
                            ? "btn btn-success btn-xs w-full"
                            : "btn btn-xs btn-active btn-ghost w-full"
                        }`}
                        label={doc.VERIFIED_BY || "Verify"}
                        onClick={
                          !doc.VERIFIED_BY ? () => handleVerify(doc) : undefined
                        }
                        disabled={!verifyEnabled[doc.REF_SEQ_NO]}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-3">Assign to</p>
                      <select
                        name="assignedTo"
                        className="select select-bordered select-xs text-center w-full"
                        onChange={(e) => handleEmployeeSelect(doc, e)}
                        value={assignedUsers[doc.REF_SEQ_NO] || ""}
                        // Disable dropdown if an assignee exists (or if the document is verified)
                        disabled={!!assignedUsers[doc.REF_SEQ_NO] || !!doc.VERIFIED_BY}
                        // disabled={!!doc.VERIFIED_BY}
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
        modalRefTask={modalRefTask}
        users={users}
        taskData={taskData}
        onTaskChange={handleTaskChange}
        onTaskCreated={handleTaskCreated}
      />

      <DocumentForm
        modalRefForm={modalRefForm}
        selectedDocument={selectedDocument}
        docMode={docFormMode}
        isVAndVProcess={isVAndVProcess}
        onSuccess={handleVerifySuccess}
      />
    </>
  );
}
