import axios from "axios";
import { useEffect, useState } from "react";
export const baseURL = import.meta.env.VITE_API_URL;
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editButton from "../../assets/icons/edit-white-24px.svg";
import "./WarehouseDetails.scss";
import { Link, useParams } from "react-router-dom";

export default function WarehouseDetailsInfo() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    fetchWarehouse();
  }, [id]);

  async function fetchWarehouse() {
    try {
      const { data } = await axios.get(`${baseURL}/api/warehouses/${id}`);
      setWarehouse(data);
    } catch (e) {
      console.log("Error fetching warehouse:", e);
    }
  }
  if (!warehouse) {
    return <div>Loading Warehouse...</div>;
  }
  return (
    <>
      <div className="details">
        <div className="details__head">
          <div className="details__header">
            <Link to="/" className="details__header--back-link">
              <img
                className="details__header--back"
                alt="back-icon"
                src={backArrow}
              />
            </Link>
            <h1 className="details__header--name">
              {warehouse.warehouse_name}
            </h1>
          </div>
          <div className="details__edit">
            <Link to={`/warehouse/${id}/edit`} className="details__edit1--link">
              <img
                className="details__edit1"
                alt="edit-icon"
                src={editButton}
              />
            </Link>
            <div className="details__edit2">
              <Link
                to={`/warehouse/${id}/edit`}
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
          <div className="details__address">
            <h3 className="details__subheader"> Warehouse Address: </h3>
            <p className="details__desc details__same-line">
              {warehouse.address}{" "}
            </p>{" "}
            <p className="details__desc details__same-line">
              {warehouse.city}, {warehouse.country}{" "}
            </p>
          </div>
          <div className="details__contact">
            <div className="details__name">
              <h3 className="details__subheader"> Contact Name: </h3>
              <p className="details__desc"> {warehouse.contact_name} </p>{" "}
              <p className="details__desc">{warehouse.contact_position}</p>
            </div>
            <div className="details__information">
              <h3 className="details__subheader"> Contact Information: </h3>
              <p className="details__desc"> {warehouse.contact_phone} </p>{" "}
              <p className="details__desc"> {warehouse.contact_email} </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
