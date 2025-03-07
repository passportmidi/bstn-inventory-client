import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import deleteButton from "../../assets/icons/delete_outline-24px.svg";
import editButton from "../../assets/icons/edit-24px.svg";
import sortButton from "../../assets/icons/sort-24px.svg";
import chevronButton from "../../assets/icons/chevron_right-24px.svg";

import "./WarehouseInventoryList.scss";
import { Link, useParams } from "react-router-dom";

export default function WarehouseInventoryList() {
  const { id } = useParams();
  const [inventoryList, setInventoryList] = useState(null);

  useEffect(() => {
    fetchInventoryList();
  }, [id]);

  async function fetchInventoryList() {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/warehouses/${id}/inventories`
      );
      setInventoryList(data);
    } catch (e) {
      console.log("Error fetching inventory list:", e);
    }
  }
  if (!inventoryList) {
    return <div>Loading Inventory List...</div>;
  }
  const handleDelete = async (inventoryId) => {
    try {
      await axios.delete(`${baseURL}/api/inventories/${inventoryId}`);
      fetchInventoryList();
    } catch (e) {
      console.log("Error deleting inventory item:", e);
    }
  };

  return (
    <>
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
            <h4 className="list__subheader">Quantity</h4>
            <img className="list__sort" alt="sort-icon" src={sortButton} />
          </div>
          <div className="list__header-item">
            <h4 className="list__subheader">Actions</h4>
          </div>
        </div>
        {inventoryList.map((inventory) => {
          return (
            <div className="list__row" key={inventory.id}>
              <div className="list__item-info">
                <h4 className="list__subheader--mobile">Inventory Item</h4>
                <div className="list__item-grp">
                  <Link
                    to={`/inventory/${inventory.id}`}
                    className="list__item-link"
                  >
                    <span className="list__item-name">
                      {inventory.item_name}
                    </span>

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

              <div className="list__item-status-qty">
                <h4 className="list__subheader--mobile">Status</h4>
                <span
                  className={`list__stock ${
                    inventory.status === "In Stock"
                      ? "in-stock"
                      : "out-of-stock"
                  }`}
                >
                  {inventory.status}
                </span>{" "}
                <h4 className="list__subheader--mobile"> Qty</h4>
                <span className="list__desc list__qty">
                  {inventory.quantity}
                </span>
              </div>

              <div className="list__item-icons">
                <img
                  onClick={() => handleDelete(inventory.id)}
                  className="list__item-delete list__item-icon"
                  alt="delete-icon"
                  src={deleteButton}
                />
                <Link to={`/inventory/${id}/edit`} className="list__item-edit">
                  <img
                    className="list__item-icon"
                    alt="edit-icon"
                    src={editButton}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
