import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const baseURL = import.meta.env.VITE_API_URL;
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editButton from "../../assets/icons/edit-white-24px.svg";
import "./WarehouseDetails.scss";

export default function WarehouseDetailsInfo() {
  //   const { id } = useParams();
  //   const [warehouse, setWarehouse] = useState(null);

  //   useEffect(() => {
  //     fetchWarehouse();
  //   }, [id]);

  //   async function fetchWarehouse() {
  //     try {
  //       const { data } = await axios.get(`${baseURL}/api/warehouse/${id}`);
  //       setWarehouse(data);
  //     } catch (e) {
  //       console.log("Error fetching warehouse:", e);
  //     }
  //   }
  //   if (!warehouse) {
  //     return <div>Loading Warehouse...</div>;
  //   }
  return (
    <>
      <div className="details">
        <div className="details__head">
          <div className="details__header">
            <img
              className="details__header--back"
              alt="back-icon"
              src={backArrow}
            />
            <h1 className="details__header--name"> Washington </h1>
          </div>
          {/* add in link to edit page  FIXME:*/}
          <div className="details__edit">
            <img className="details__edit1" alt="edit-icon" src={editButton} />
            <div className="details__edit2">
              <img
                className="details__edit2--icon"
                alt="edit-icon"
                src={editButton}
              />
              <p className="details__edit2--desc"> Edit </p>
            </div>
          </div>
        </div>
        <div className="details__main">
          <div className="details__address">
            <h3 className="details__subheader"> Warehouse Address </h3>
            <p className="details__desc details__same-line"> 300 pearl west </p>
            <p className="details__desc details__same-line">washington USA</p>
          </div>
          <div className="details__contact">
            <div className="details__name">
              <h3 className="details__subheader"> Contact Name </h3>
              <p className="details__desc"> Brinda Patel </p>
              <p className="details__desc"> Warehouse Manager</p>
            </div>
            <div className="details__information">
              <h3 className="details__subheader"> Contact Information </h3>
              <p className="details__desc"> +1 613-617-0931 </p>
              <p className="details__desc"> brpatel@deloitte.ca </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* "warehouse_name": "Manhattan",
    "address": "503 Broadway",
    "city": "New York",
    "country": "USA",
    "contact_name": "Parmin Aujla",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (646) 123-1234",
    "contact_email": "paujla@instock.com"
    </> */
}
