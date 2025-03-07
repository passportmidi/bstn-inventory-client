import axios from "axios";
import { useEffect, useState } from "react";
import deleteLogo from "../../assets/icons/delete_outline-24px.svg";
import editLogo from "../../assets/icons/edit-24px.svg";
import "./Warehouses.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const baseURL = import.meta.env.VITE_API_URL;

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    try {
      const { data } = await axios.get(`${baseURL}/api/warehouses`);
      setWarehouses(data);
    } catch (e) {
      console.log("Error fetching warehouses:", e);
    }
  }

  if (!warehouses) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="warehouse">
        <div className="warehouse__head">
          <h1 className="warehouse__header">Warehouses</h1>
        </div>
        {warehouses.map((warehouse) => {
          return (
            <div className="warehouse__row" key={warehouse.id}>
              <div class="warehouse__column">
                <div class="warehouse__cell">
                  <div className="warehouse__cell-label">Warehouse</div>
                  <div className="warehouse__cell-item warehouse__name">
                    {warehouse.warehouse_name}
                  </div>
                </div>
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">Address</div>
                  <div className="warehouse__cell-item warehouse__address">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</div>
                </div>
              </div>
              <div class="warehouse__column">
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">Contact Name</div>
                  <div className="warehouse__cell-item warehouse__contact">
                    {warehouse.contact_name}
                  </div>
                </div>
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">
                    Contact Information
                  </div>
                  <div className="warehouse__contact-info">
                    <div className="warehouse__cell-item warehouse__phone">
                      {warehouse.contact_phone}
                    </div>
                    <div className="warehouse__cell-item warehouse__email">
                      {warehouse.contact_email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="warehouse__cell warehouse__cell--actions">
                <div className="warehouse__cell-label">Actions</div>
                <div className="warehouse__cell-item warehouse__actions">
                  <img src={deleteLogo} alt="Delete" />
                  <img src={editLogo} alt="Edit" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
