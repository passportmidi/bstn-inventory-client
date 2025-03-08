import axios from "axios";
import { useEffect, useState } from "react";
import deleteLogo from "../../assets/icons/delete_outline-24px.svg";
import editLogo from "../../assets/icons/edit-24px.svg";
import chevronLogo from "../../assets/icons/chevron_right-24px.svg";
import sortLogo from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";
import { Link } from "react-router-dom";
import searchButton from "../../assets/icons/search-24px.svg";
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal";

const baseURL = import.meta.env.VITE_API_URL;

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

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

  const handleOpenDeleteModal = (warehouse) => {
    console.log("Selected warehouse for deletion:", warehouse);
    setSelectedWarehouse(warehouse);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    console.log("Closing delete modal");
    setSelectedWarehouse(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedWarehouse) return;

    const warehouseId = selectedWarehouse.id;
    console.log("Attempting to delete warehouse with ID:", warehouseId);

    try {
      await axios.delete(`${baseURL}/api/warehouses/${warehouseId}`);
      setWarehouses((prevWarehouses) =>
        prevWarehouses.filter((warehouse) => warehouse.id !== warehouseId)
      );
      handleCloseDeleteModal();
      console.log("Deletion successful");
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  if (!warehouses) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="warehouse">
        <div className="head">
          <div className="head__header">
            <h1 className="head__header--name">Warehouses</h1>
          </div>
          <div className="head__actions">
            <button className="head__search">
              <span className="head__search--desc"> Search... </span>
              <img
                className="head__search--icon"
                src={searchButton}
                alt="search-icon"
              />
            </button>
            <Link to={`/warehouse/add`} className="head__add-link">
              <div className="head__add"> + Add New Warehouse </div>
            </Link>
          </div>
        </div>
        {warehouses.map((warehouse) => {
          return (
            <div className="warehouse__row" key={warehouse.id}>
              <div className="warehouse__column">
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label warehouse__cell-label--first">
                    Warehouse
                    <img
                      className="warehouse__sort-icon"
                      src={sortLogo}
                      alt="Sort"
                    />
                  </div>
                  <Link
                    to={`/warehouse/${warehouse.id}`}
                    className="warehouse__link"
                  >
                    <div className="warehouse__cell-item warehouse__name">
                      {warehouse.warehouse_name}
                      <img src={chevronLogo} alt="Arrow" />
                    </div>
                  </Link>
                </div>
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">
                    Address
                    <img
                      className="warehouse__sort-icon"
                      src={sortLogo}
                      alt="Sort"
                    />
                  </div>
                  <div className="warehouse__cell-item warehouse__address">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</div>
                </div>
              </div>
              <div className="warehouse__column">
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">
                    Contact Name
                    <img
                      className="warehouse__sort-icon"
                      src={sortLogo}
                      alt="Sort"
                    />
                  </div>
                  <div className="warehouse__cell-item warehouse__contact">
                    {warehouse.contact_name}
                  </div>
                </div>
                <div className="warehouse__cell">
                  <div className="warehouse__cell-label">
                    Contact Information
                    <img
                      className="warehouse__sort-icon"
                      src={sortLogo}
                      alt="Sort"
                    />
                  </div>
                  <div className="warehouse__cell-item warehouse__contact-info">
                    <div className="warehouse__phone">
                      {warehouse.contact_phone}
                    </div>
                    <div className="warehouse__email">
                      {warehouse.contact_email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="warehouse__cell warehouse__cell--actions">
                <div className="warehouse__cell-label warehouse__cell-label--last">
                  Actions
                </div>
                <div className="warehouse__cell-item warehouse__actions">
                  <img
                    src={deleteLogo}
                    alt="Delete"
                    onClick={() => handleOpenDeleteModal(warehouse)}
                  />
                  <Link
                    to={`/warehouse/${warehouse.id}/edit`}
                    className="warehouse__icon-link"
                  >
                    <img src={editLogo} alt="Edit" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <WarehouseDeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        itemName={selectedWarehouse ? selectedWarehouse.warehouse_name : ""}
      />
    </>
  );
}
