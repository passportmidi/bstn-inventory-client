import { useState } from "react";
import axios from "axios";
import InventoryDeleteModal from "../../components/InventoryDeleteModal/InventoryDeleteModal";


const Inventories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Television" },
    { id: 2, name: "Shampoo"},
  ]);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/inventories/${selectedItem.id}`
      );

      setInventoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItem.id)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Unable to delete inventory item. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="inventories">
      <h1>Inventory</h1>
      <div className="inventories__list">
        {inventoryItems.map((item) => (
          <div key={item.id} className="inventory-item">
            <div className="inventory-item__details">
              <h2>{item.name}</h2>
            </div>
            <button
              className="inventory-item__delete-button"
              onClick={() => handleDeleteClick(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <InventoryDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteConfirm}
        itemName={selectedItem ? selectedItem.name : ""}
      />
    </div>
  );
};

export default Inventories;