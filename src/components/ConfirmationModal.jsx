const ConfirmationModal = ({ isOpen, onAccept, onDecline, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Confirm Action</h2>
        <p className="mt-4">Do you want to accept this task?</p>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="btn btn-secondary" onClick={onDecline}>
            Decline
          </button>
          <button className="btn btn-primary" onClick={onAccept}>
            Accept
          </button>
        </div>
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
