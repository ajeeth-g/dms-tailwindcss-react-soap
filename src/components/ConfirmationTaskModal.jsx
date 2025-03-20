import { X } from "lucide-react";

const ConfirmationTaskModal = ({ isOpen, onAction, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="confirmation-task-modal"
      className="modal modal-open modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Confirm Action</h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X />
          </button>
        </div>
        <p className="py-4">Do you want to accept this task?</p>
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => onAction({ status: "REJECTED" })}
          >
            Decline
          </button>
          <button
            className="btn btn-success"
            onClick={() => onAction({ status: "ACCEPTED" })}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationTaskModal;
