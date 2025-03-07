import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editButton from "../../assets/icons/edit-white-24px.svg";
import "./InventoryDetails.scss";
import { Link, useParams } from "react-router-dom";

export default function InventoryDetailsInfo() {
  const { id } = useParams();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, [id]);

  async function fetchInventory() {
    try {
      const { data } = await axios.get(`${baseURL}/api/inventories/${id}`);
      setInventory(data);
    } catch (e) {
      console.log("Error fetching inventory:", e);
    }
  }
  if (!inventory) {
    return <div>Loading Inventory...</div>;
  }

  return (
    <>
      <div className="details">
        <div className="details__head">
          <div className="details__header">
            <Link
              to={`/warehouse/${inventory.warehouse_id}`}
              className="details__header--back-link"
            >
              <img
                className="details__header--back"
                alt="back-icon"
                src={backArrow}
              />
            </Link>
            <h1 className="details__header--name">{inventory.item_name}</h1>
          </div>
          <div className="details__edit">
            <Link to={`/inventory/${id}/edit`} className="details__edit1--link">
              <img
                className="details__edit1"
                alt="edit-icon"
                src={editButton}
              />
            </Link>
            <div className="details__edit2">
              <Link
                to={`/inventory/${id}/edit`}
                className="details__edit2--link"
              >
                <img
                  className="details__edit2--icon"
                  alt="edit-icon"
                  src={editButton}
                />
                <p className="details__edit2--desc"> Edit </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="details__main">
          <div className="details__content">
            <div className="details__item">
              <h3 className="details__subheader"> Item Description: </h3>
              <p className="details__desc">{inventory.description} </p>{" "}
            </div>
            <div className="details__category">
              <h3 className="details__subheader"> Category: </h3>
              <p className="details__desc"> {inventory.category} </p>
            </div>
          </div>
          <div className="details__info">
            <div className="details__stats">
              <div className="details__status">
                <h3 className="details__subheader"> Status: </h3>
                <p
                  className={`details__stock ${
                    inventory.status === "In Stock"
                      ? "in-stock"
                      : "out-of-stock"
                  }`}
                >
                  {" "}
                  {inventory.status}{" "}
                </p>
              </div>
              <div className="details__quantity">
                <h3 className="details__subheader"> Quantity: </h3>
                <p className="details__desc"> {inventory.quantity} </p>
              </div>
            </div>
            <div className="details__warehouse">
              <h3 className="details__subheader"> Warehouse: </h3>
              <p className="details__desc"> {inventory.warehouse_id} </p>
              {/* FIXME: i need warehouse name not ID...do i have to join my table? or can i pull from another query? */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
