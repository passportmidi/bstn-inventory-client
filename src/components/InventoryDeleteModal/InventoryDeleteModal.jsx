import React from "react";
import ReactModal from "react-modal";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./InventoryDeleteModal.scss";

ReactModal.setAppElement("#root");

const InventoryDeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Inventory Item"
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="delete-modal__header">
        <h2 className="delete-modal__title">Delete {itemName} inventory item?</h2>
        <button className="delete-modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
      <p className="delete-modal__message">
        Please confirm that you’d like to delete {itemName} from the inventory list. You won’t be able to undo this action.
      </p>
      <div className="delete-modal__buttons">
        <button className="delete-modal__cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="delete-modal__delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </ReactModal>
  );
};

export default InventoryDeleteModal;