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
      <h1> HI </h1>
    </>
  );
}
