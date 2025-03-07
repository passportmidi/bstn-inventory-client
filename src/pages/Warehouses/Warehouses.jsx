import axios from "axios";
import { useEffect, useState } from "react";
import deleteLogo from "../../assets/icons/delete_outline-24px.svg";
import editLogo from "../../assets/icons/edit-24px.svg";
import chevronLogo from "../../assets/icons/chevron_right-24px.svg";
import sortLogo from "../../assets/icons/sort-24px.svg";
import "./Warehouses.scss";
import { Link } from "react-router-dom";

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
                  <Link
                    to={`/warehouse/${warehouse.id}/delete`}
                    className="warehouse__link"
                  >
                    <img src={deleteLogo} alt="Delete" />
                  </Link>
                  <Link
                    to={`/warehouse/${warehouse.id}/edit`}
                    className="warehouse__link"
                  >
                    <img src={editLogo} alt="Edit" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal";

// const Warehouses = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [inventoryItems, setInventoryItems] = useState([
//     { id: 1, name: "Manhattan" },
//     { id: 2, name: "SF"},
//   ]);

//   const handleDeleteClick = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/warehouses/${selectedItem.id}`
//       );

//       setInventoryItems((prevItems) =>
//         prevItems.filter((item) => item.id !== selectedItem.id)
//       );
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error deleting warehouse:", error);
//       alert("Unable to delete warehouse. Please try again.");
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="warehouses">
//       <h1>Inventory</h1>
//       <div className="warehouses__list">
//         {inventoryItems.map((item) => (
//           <div key={item.id} className="warehouses-item">
//             <div className="warehouse-item__details">
//               <h2>{item.name}</h2>
//             </div>
//             <button
//               className="warehouse__delete-button"
//               onClick={() => handleDeleteClick(item)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       <WarehouseDeleteModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onDelete={handleDeleteConfirm}
//         itemName={selectedItem ? selectedItem.name : ""}
//       />
//     </div>
//   );
// };

// export default Warehouses;
