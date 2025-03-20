import { useState } from "react";
import { CalendarDays, MessageSquare, X } from "lucide-react";
import { formatDateTime } from "../utils/dateUtils";

const UpdateTaskModal = ({ isOpen, onAction, onClose }) => {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");

  if (!isOpen) return null;

  // Determine whether the current option requires date.
  const requiresDate = ["REMIND ME LATER", "POSTPONED", "COMPLETED"].includes(
    status
  );

  // Determine whether the current option requires remarks.
  const requiresRemarks = [
    "POSTPONED",
    "UNABLE TO COMPLETE",
    "CANCELLED",
  ].includes(status);

  // Validate inputs and pass the data to the parent.
  const handleUpdateClick = () => {
    if (requiresDate && !date) {
      alert("Please enter a date.");
      return;
    }
    if (requiresRemarks && !remarks.trim()) {
      alert("Remarks are mandatory for the selected option.");
      return;
    }

    // Pass the data to the parent. For options that don't need remarks, pass an empty string.
    onAction({ status, date, remarks: requiresRemarks ? remarks : "" });
    onClose();
  };

  // Render the dynamic content based on the selected option.
  const renderContent = () => {
    switch (status) {
      case "REMIND ME LATER":
        return (
          <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <label className="text-xs">Reminder Date</label>
            </div>
            <input
              type="datetime-local"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered input-sm w-full"
            />
          </div>
        );
      case "POSTPONED":
        return (
          <>
            <div className="flex flex-wrap items-center gap-3 w-full">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <label className="text-xs">Postponed on</label>
              </div>
              <input
                type="datetime-local"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered input-sm w-full"
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <label htmlFor="COMMENTS" className="text-xs">
                  Remarks
                </label>
              </div>
              <textarea
                name="COMMENTS"
                id="COMMENTS"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks for postponement"
                className="textarea textarea-bordered textarea-xs w-full"
              ></textarea>
            </div>
          </>
        );
      case "UNABLE TO COMPLETE":
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <label htmlFor="COMMENTS" className="text-xs">
                Remarks
              </label>
            </div>
            <textarea
              name="COMMENTS"
              id="COMMENTS"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks for unable to complete"
              className="textarea textarea-bordered textarea-xs w-full"
            ></textarea>
          </div>
        );
      case "COMPLETED":
        return (
          <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <label className="text-xs">Completed on</label>
            </div>
            <input
              type="datetime-local"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered input-sm w-full"
            />
          </div>
        );
      case "CANCELLED":
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <label htmlFor="COMMENTS" className="text-xs">
                Remarks
              </label>
            </div>
            <textarea
              name="COMMENTS"
              id="COMMENTS"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks for cancellation"
              className="textarea textarea-bordered textarea-xs w-full"
            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  // Reset date and remarks when the option changes.
  const handleOptionChange = (value) => {
    setStatus(value);
    setDate("");
    setRemarks("");
  };

  return (
    <div
      id="update-task-modal"
      className="modal modal-open modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Update Task Details</h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Radio Options */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <input
            className="join-item btn btn-sm w-full sm:w-auto"
            type="radio"
            name="options"
            value="REMIND ME LATER"
            onChange={(e) => handleOptionChange(e.target.value)}
            aria-label="Remind me later"
          />
          <input
            className="join-item btn btn-sm w-full sm:w-auto"
            type="radio"
            name="options"
            value="POSTPONED"
            onChange={(e) => handleOptionChange(e.target.value)}
            aria-label="Postponed"
          />
          <input
            className="join-item btn btn-sm w-full sm:w-auto"
            type="radio"
            name="options"
            value="UNABLE TO COMPLETE"
            onChange={(e) => handleOptionChange(e.target.value)}
            aria-label="Unable to complete"
          />
          <input
            className="join-item btn btn-sm w-full sm:w-auto"
            type="radio"
            name="options"
            value="COMPLETED"
            onChange={(e) => handleOptionChange(e.target.value)}
            aria-label="Completed"
          />
          <input
            className="join-item btn btn-sm w-full sm:w-auto"
            type="radio"
            name="options"
            value="CANCELLED"
            onChange={(e) => handleOptionChange(e.target.value)}
            aria-label="Cancelled"
          />
        </div>

        {/* Dynamic Content */}
        <div className="mt-4">{renderContent()}</div>

        {/* Modal Actions */}
        <div className="modal-action mt-4">
          <button className="btn btn-neutral" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-success" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
