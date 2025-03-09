import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import deleteButton from "../../assets/icons/delete_outline-24px.svg";
import editButton from "../../assets/icons/edit-24px.svg";
import sortButton from "../../assets/icons/sort-24px.svg";
import chevronButton from "../../assets/icons/chevron_right-24px.svg";
import searchButton from "../../assets/icons/search-24px.svg";
import "./InventoryList.scss";
import { Link, useParams } from "react-router-dom";
import InventoryDeleteModal from "../../components/InventoryDeleteModal/InventoryDeleteModal";

export default function InventoryList() {
  const { id } = useParams();
  const [inventoryList, setInventoryList] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetchInventoryList();
  }, [id]);
  async function fetchInventoryList() {
    try {
      const { data } = await axios.get(`${baseURL}/api/inventories`);
      "Fetched inventories:", data;
      setInventoryList(data);
    } catch (e) {
      console.log("Error fetching inventories:", e);
    }
  }
  const handleOpenDeleteModal = (item) => {
    "Selected item for deletion:", item;
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    ("Closing delete modal");
    setSelectedItem(null);
    setDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    if (!selectedItem) return;
    const inventoryId = selectedItem.id;
    "Attempting to delete inventory with ID:", inventoryId;
    try {
      await axios.delete(`${baseURL}/api/inventories/${inventoryId}`);
      setInventoryList(inventoryList.filter((item) => item.id !== inventoryId));
      handleCloseDeleteModal();
      ("Deletion successful");
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };
  if (!inventoryList) {
    return <div>Loading Inventory List...</div>;
  }
  return (
    <>
      <div className="main">
        <div className=" main__header">
          <h1 className=" main__header--name">Inventory</h1>
        </div>
        <div className=" main__actions">
          <button className="main__search">
            <span className="main__search--desc"> Search... </span>
            <img
              className="main__search--icon"
              src={searchButton}
              alt="search-icon"
            />
          </button>
          <Link to={`/inventory/add`} className=" main__add-link">
            <div className=" main__add"> + Add New Item </div>
          </Link>
        </div>
      </div>
      <div className="list">
        <div className="list__subheaders">
          <div className="list__header-item">
            <h4 className="list__subheader">Inventory Item</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Category</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Status</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Qty</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Warehouse</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Actions</h4>
          </div>
        </div>
        {inventoryList.map((inventory) => (
          <div className="list__row" key={inventory.id}>
            <div className="list__item-info">
              <h4 className="list__subheader--mobile">Inventory Item</h4>
              <div className="list__item-grp">
                <Link
                  to={`/inventory/${inventory.id}`}
                  className="list__item-link"
                >
                  <span className="list__item-name">{inventory.item_name}</span>
                  <img
                    className="list__item-icon"
                    alt="chevron right-icon"
                    src={chevronButton}
                  />
                </Link>
              </div>
              <h4 className="list__subheader--mobile">Category</h4>
              <span className="list__desc list__ctgy">
                {inventory.category}
              </span>
            </div>
            <div className="list__item-status-qty-wh">
              <h4 className="list__subheader--mobile">Status</h4>
              <div className="list__stock-area">
                <span
                  className={`list__stock ${
                    inventory.status === "In Stock"
                      ? "in-stock"
                      : "out-of-stock"
                  }`}
                >
                  {inventory.status}
                </span>
              </div>
              <h4 className="list__subheader--mobile"> Qty</h4>
              <span className="list__desc list__qty">{inventory.quantity}</span>
              <h4 className="list__subheader--mobile"> Warehouse</h4>
              <span className="list__desc list__whs">
                {inventory.warehouse_name}
              </span>
            </div>
            <div className="list__item-icons">
              <img
                className="list__item-delete list__item-icon"
                alt="delete-icon"
                src={deleteButton}
                onClick={() => handleOpenDeleteModal(inventory)}
              />
              <Link
                to={`/inventory/${inventory.id}/edit`}
                className="list__item-edit"
              >
                <img
                  className="list__item-icon"
                  alt="edit-icon"
                  src={editButton}
                />
              </Link>
            </div>
          </div>
        ))}
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
