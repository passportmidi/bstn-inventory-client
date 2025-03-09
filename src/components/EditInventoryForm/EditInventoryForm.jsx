import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../AddInventoryForm/AddInventoryForm.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";

const EditInventoryItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "0",
    warehouse: "",
  });

  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/inventories`
        );

        const inventoryItem = data.find((item) => item.id === parseInt(id, 10));

        if (inventoryItem) {
          setFormData({
            itemName: inventoryItem.item_name,
            description: inventoryItem.description,
            category: inventoryItem.category,
            status: inventoryItem.status,
            quantity: inventoryItem.quantity.toString(),
            warehouse: inventoryItem.warehouse_name,
          });
        } else {
          console.error("Inventory item not found");
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [id]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/warehouses`
        );
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/inventories`
        );
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemName) newErrors.itemName = "Item Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (formData.status === "In Stock" && !formData.quantity) {
      newErrors.quantity = "Quantity is required";
    }
    if (!formData.warehouse) newErrors.warehouse = "Warehouse is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const requestBody = {
        warehouse_id: warehouses.find(
          (wh) => wh.warehouse_name === formData.warehouse
        )?.id,
        item_name: formData.itemName,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        quantity: parseInt(formData.quantity, 10),
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/inventories/${id}`,
        requestBody
      );

      ("Inventory updated successfully!");

      navigate("/inventory");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Unable to update inventory item. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-inventory-item">
      <div className="add-inventory-item__header">
        <Link to="/inventory" className="add-inventory-item__back-link">
          <img
            src={arrowBackIcon}
            alt="Back"
            className="add-inventory-item__back-icon"
          />
        </Link>
        <h1 className="add-inventory-item__title">Edit Inventory Item</h1>
      </div>
      <div className="add-inventory-item__divider"></div>
      <form className="add-inventory-item__form" onSubmit={handleSubmit}>
        <div className="add-inventory-item__form-sections">
          <div className="add-inventory-item__section">
            <h2 className="add-inventory-item__section-title">Item Details</h2>
            <div className="add-inventory-item__form-group">
              <label className="add-inventory-item__label">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className={`add-inventory-item__input ${
                  errors.itemName ? "add-inventory-item__input--error" : ""
                }`}
                placeholder="Item Name"
              />
              {errors.itemName && (
                <span className="add-inventory-item__error-message">
                  {errors.itemName}
                </span>
              )}
            </div>
            <div className="add-inventory-item__form-group">
              <label className="add-inventory-item__label">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`add-inventory-item__input add-inventory-item__input--description ${
                  errors.description ? "add-inventory-item__input--error" : ""
                }`}
                placeholder="Please enter a brief item description..."
              />
              {errors.description && (
                <span className="add-inventory-item__error-message">
                  {errors.description}
                </span>
              )}
            </div>
            <div className="add-inventory-item__form-group">
              <label className="add-inventory-item__label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`add-inventory-item__input ${
                  errors.category ? "add-inventory-item__input--error" : ""
                }`}
              >
                <option value="">Please select</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="add-inventory-item__error-message">
                  {errors.category}
                </span>
              )}
            </div>
          </div>
          <div className="add-inventory-item__divider-horizontal"></div>
          <div className="add-inventory-item__divider-vertical"></div>
          <div className="add-inventory-item__section">
            <h2 className="add-inventory-item__section-title">
              Item Availability
            </h2>
            <div className="add-inventory-item__form-group">
              <label className="add-inventory-item__label">Status</label>
              <div className="add-inventory-item__radio-group">
                <label
                  className={`add-inventory-item__radio-label ${
                    formData.status === "Out of Stock"
                      ? "add-inventory-item__radio-label--disabled"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="In Stock"
                    checked={formData.status === "In Stock"}
                    onChange={handleChange}
                  />
                  In stock
                </label>
                <label
                  className={`add-inventory-item__radio-label ${
                    formData.status === "In Stock"
                      ? "add-inventory-item__radio-label--disabled"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Out of Stock"
                    checked={formData.status === "Out of Stock"}
                    onChange={handleChange}
                  />
                  Out of stock
                </label>
              </div>
              {errors.status && (
                <span className="add-inventory-item__error-message">
                  {errors.status}
                </span>
              )}
            </div>
            {formData.status === "In Stock" && (
              <div className="add-inventory-item__form-group">
                <label className="add-inventory-item__label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`add-inventory-item__input ${
                    errors.quantity ? "add-inventory-item__input--error" : ""
                  }`}
                  placeholder="Quantity"
                />
                {errors.quantity && (
                  <span className="add-inventory-item__error-message">
                    {errors.quantity}
                  </span>
                )}
              </div>
            )}
            <div className="add-inventory-item__form-group">
              <label className="add-inventory-item__label">Warehouse</label>
              <select
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
                className={`add-inventory-item__input ${
                  errors.warehouse ? "add-inventory-item__input--error" : ""
                }`}
              >
                <option value="">Please select</option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.warehouse_name}>
                    {wh.warehouse_name}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <span className="add-inventory-item__error-message">
                  {errors.warehouse}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="add-inventory-item__buttons">
          <Link to="/inventory" className="add-inventory-item__cancel-button">
            Cancel
          </Link>
          <button type="submit" className="add-inventory-item__submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInventoryItem;
