import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import deleteButton from "../../assets/icons/delete_outline-24px.svg";
import editButton from "../../assets/icons/edit-24px.svg";
import sortButton from "../../assets/icons/sort-24px.svg";
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
      </div>
      {inventoryList.map((inventory) => {
        return (
          <div className="list__row" key={inventory.id}>
            <div className="list__item-content">
              <span>{inventory.item_name}</span>
              <span>{inventory.category}</span>
              <span>{inventory.status}</span>
              <span>{inventory.quantity}</span>
              <Link to={`/inventory/${id}/edit`} className="list__item-edit">
                <img
                  className="list__item-icon"
                  alt="edit-icon"
                  src={editButton}
                />
              </Link>
              {/* FIXME: where does the delete button point to? is it an onclick event? */}
              <img
                onClick={() => handleDelete(inventory.id)}
                className="list__item-delete list__item-icon"
                alt="edit-icon"
                src={deleteButton}
              />
            </div>
          </div>
        );
      })}
    </>
  );
  {
    /* <div class="shows__box">
    <h3 class="shows__header">Date</h3>
    <div class="shows__date">Monday, Sep 09, 2024</div>
    <h3 class="shows__header">Venue</h3>
    <div class="shows__venue">Ronald Lane</div>
    <h3 class="shows__header">Location</h3>
    <div class="shows__location">San Francisco, CA</div>
    <button class="shows__button">Buy Tickets</button>
  </div>; */
  }
}
