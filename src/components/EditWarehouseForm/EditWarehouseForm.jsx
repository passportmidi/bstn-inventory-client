import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../AddWarehouseForm/AddWarehouseForm.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";

const EditWarehouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        console.log("Fetching warehouse with id:", id);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
        );
        console.log("Fetched data:", data);
        setFormData({
          warehouseName: data.warehouse_name,
          streetAddress: data.address,
          city: data.city,
          country: data.country,
          contactName: data.contact_name,
          position: data.contact_position,
          phoneNumber: data.contact_phone,
          email: data.contact_email,
        });
      } catch (error) {
        console.error("Error fetching warehouse:", error);
      }
    };

    fetchWarehouse();
  }, [id]);

  const validateEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.startsWith("+1");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.warehouseName)
      newErrors.warehouseName = "Warehouse Name is required";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.contactName)
      newErrors.contactName = "Contact Name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must start with +1";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`,
          formData
        );
        console.log("Warehouse updated successfully!");
        setUpdated(true);
      } catch (error) {
        console.error("Error updating warehouse:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (updated) {
    navigate("/warehouses");
  }

  return (
    <div className="add-warehouse">
      <div className="add-warehouse__header">
        <Link to="/warehouses" className="add-warehouse__back-link">
          <img
            src={arrowBackIcon}
            alt="Back"
            className="add-warehouse__back-icon"
          />
        </Link>
        <h1 className="add-warehouse__title">Edit Warehouse</h1>
      </div>
      <div className="add-warehouse__divider"></div>
      <form className="add-warehouse__form" onSubmit={handleSubmit}>
        <div className="add-warehouse__form-sections">
          <div className="add-warehouse__section">
            <h2 className="add-warehouse__section-title">Warehouse Details</h2>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Warehouse Name</label>
              <input
                type="text"
                name="warehouseName"
                value={formData.warehouseName}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.warehouseName ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Warehouse Name"
              />
              {errors.warehouseName && (
                <span className="add-warehouse__error-message">
                  {errors.warehouseName}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.streetAddress ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Street Address"
              />
              {errors.streetAddress && (
                <span className="add-warehouse__error-message">
                  {errors.streetAddress}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.city ? "add-warehouse__input--error" : ""
                }`}
                placeholder="City"
              />
              {errors.city && (
                <span className="add-warehouse__error-message">
                  {errors.city}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.country ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Country"
              />
              {errors.country && (
                <span className="add-warehouse__error-message">
                  {errors.country}
                </span>
              )}
            </div>
          </div>
          <div className="add-warehouse__divider-horizontal"></div>
          <div className="add-warehouse__divider-vertical"></div>
          <div className="add-warehouse__section">
            <h2 className="add-warehouse__section-title">Contact Details</h2>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.contactName ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Contact Name"
              />
              {errors.contactName && (
                <span className="add-warehouse__error-message">
                  {errors.contactName}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.position ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Position"
              />
              {errors.position && (
                <span className="add-warehouse__error-message">
                  {errors.position}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.phoneNumber ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <span className="add-warehouse__error-message">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="add-warehouse__form-group">
              <label className="add-warehouse__label">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`add-warehouse__input ${
                  errors.email ? "add-warehouse__input--error" : ""
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <span className="add-warehouse__error-message">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="add-warehouse__buttons">
          <Link to="/warehouses" className="add-warehouse__cancel-button">
            Cancel
          </Link>
          <button type="submit" className="add-warehouse__submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWarehouse;
