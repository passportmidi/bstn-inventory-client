import { useState } from "react";
import axios from "axios";
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal";


const Warehouses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Manhattan" },
    { id: 2, name: "SF"},
  ]);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/warehouses/${selectedItem.id}`
      );

      setInventoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      alert("Unable to delete warehouse. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="warehouses">
      <h1>Inventory</h1>
      <div className="warehouses__list">
        {inventoryItems.map((item) => (
          <div key={item.id} className="warehouses-item">
            <div className="warehouse-item__details">
              <h2>{item.name}</h2>
            </div>
            <button
              className="warehouse__delete-button"
              onClick={() => handleDeleteClick(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <WarehouseDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteConfirm}
        itemName={selectedItem ? selectedItem.name : ""}
      />
    </div>
  );
};

export default Warehouses;
