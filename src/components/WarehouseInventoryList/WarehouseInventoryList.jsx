import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import deleteButton from "../../assets/icons/delete_outline-24px.svg";
import editButton from "../../assets/icons/edit-24px.svg";
import sortButton from "../../assets/icons/sort-24px.svg";
import chevronButton from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseInventoryList.scss";
import { Link, useParams } from "react-router-dom";
import InventoryDeleteModal from "../../components/InventoryDeleteModal/InventoryDeleteModal";
export default function WarehouseInventoryList() {
  const { id } = useParams();
  const [inventoryList, setInventoryList] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    console.log("Warehouse ID from URL:", id);
    fetchInventoryList();
  }, [id]);
  async function fetchInventoryList() {
    try {
      console.log("Fetching inventory list for warehouse ID:", id);
      const { data } = await axios.get(
        `${baseURL}/api/warehouses/${id}/inventories`
      );
      console.log("Fetched inventory list:", data);
      setInventoryList(data);
    } catch (e) {
      console.log("Error fetching inventory list:", e);
    }
  }
  const handleOpenDeleteModal = (item) => {
    console.log("Selected item for deletion:", item);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    console.log("Closing delete modal");
    setSelectedItem(null);
    setDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    if (!selectedItem) return;
    const inventoryId = selectedItem.id;
    console.log("Attempting to delete inventory with ID:", inventoryId);
    try {
      await axios.delete(`${baseURL}/api/inventories/${inventoryId}`);
      setInventoryList((prevList) =>
        prevList.filter((item) => item.id !== inventoryId)
      );
      handleCloseDeleteModal();
      console.log("Deletion successful");
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };
  if (!inventoryList) {
    return <div></div>;
  }

  return (
    <>
      <div className="wh-list">
        <div className="wh-list__subheaders">
          <div className="wh-list__header-item">
            <h4 className="wh-list__subheader">Inventory Item</h4>
            <img className="wh-list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="wh-list__header-item">
            <h4 className="wh-list__subheader">Category</h4>
            <img className="wh-list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="wh-list__header-item">
            <h4 className="wh-list__subheader">Status</h4>
            <img className="wh-list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="wh-list__header-item">
            <h4 className="wh-list__subheader">Quantity</h4>
            <img className="wh-list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="wh-list__header-item">
            <h4 className="wh-list__subheader">Actions</h4>
          </div>
        </div>
        {inventoryList.map((inventory) => {
          return (
            <div className="wh-list__row" key={inventory.id}>
              <div className="wh-list__item-info">
                <h4 className="wh-list__subheader--mobile">Inventory Item</h4>
                <div className="wh-list__item-grp">
                  <Link
                    to={`/inventory/${inventory.id}`}
                    className="wh-list__item-link"
                  >
                    <span className="wh-list__item-name ">
                      {inventory.item_name}
                    </span>

                    <img
                      className="wh-list__item-icon"
                      alt="chevron right-icon"
                      src={chevronButton}
                    />
                  </Link>
                </div>

                <h4 className="wh-list__subheader--mobile">Category</h4>
                <span className="wh-list__desc wh-list__ctgy">
                  {inventory.category}
                </span>
              </div>

              <div className="wh-list__item-status-qty">
                <h4 className="wh-list__subheader--mobile">Status</h4>
                <span
                  className={`wh-list__stock ${
                    inventory.status === "In Stock"
                      ? "wh-in-stock"
                      : "wh-out-of-stock"
                  }`}
                >
                  {inventory.status}
                </span>{" "}
                <h4 className="wh-list__subheader--mobile"> Qty</h4>
                <span className="wh-list__desc wh-list__qty">
                  {inventory.quantity}
                </span>
              </div>

              <div className="wh-list__item-icons">
                <img
                  className="wh-list__item-delete wh-list__item-icon"
                  alt="delete-icon"
                  src={deleteButton}
                  onClick={() => handleOpenDeleteModal(inventory)}
                />
                <Link
                  to={`/inventory/${inventory.id}/edit`}
                  className="wh-list__item-edit"
                >
                  <img
                    className="wh-list__item-icon"
                    alt="edit-icon"
                    src={editButton}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <InventoryDeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        itemName={selectedItem ? selectedItem.item_name : ""}
      />
    </>
  );
}
