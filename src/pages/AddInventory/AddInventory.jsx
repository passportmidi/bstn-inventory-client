import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddInventory.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import Header from "../../components/Header/Header";

const AddInventoryItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "0",
    warehouse: "",
  });

  const [errors, setErrors] = useState({});

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

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to the backend
      console.log("Form submitted:", formData);
      // Add API call here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="add-inventory-item">
        <div className="add-inventory-item__header">
          <Link to="/" className="add-inventory-item__back-link">
            <img
              src={arrowBackIcon}
              alt="Back"
              className="add-inventory-item__back-icon"
            />
          </Link>
          <h1 className="add-inventory-item__title">Add New Inventory Item</h1>
        </div>
        <div className="add-inventory-item__divider"></div>
        <form className="add-inventory-item__form" onSubmit={handleSubmit}>
          <div className="add-inventory-item__form-sections">
            <div className="add-inventory-item__section">
              <h2 className="add-inventory-item__section-title">
                Item Details
              </h2>
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
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
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
                  <label className="add-inventory-item__radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="In Stock"
                      checked={formData.status === "In Stock"}
                      onChange={handleChange}
                    />
                    In stock
                  </label>
                  <label className="add-inventory-item__radio-label">
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
                  <option value="Warehouse A">Warehouse A</option>
                  <option value="Warehouse B">Warehouse B</option>
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
            <Link to="/" className="add-inventory-item__cancel-button">
              Cancel
            </Link>
            <button type="submit" className="add-inventory-item__submit-button">
              + Add Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddInventoryItem;
