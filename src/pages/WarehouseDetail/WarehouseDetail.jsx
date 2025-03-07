import Header from "../../components/Header/Header";
import WarehouseDetailsInfo from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import Footer from "../../components/Footer/Footer";
import "./WarehouseDetail.scss";

export default function WarehouseDetails() {
  return (
    <>
      <div className="warehouse">
        <WarehouseDetailsInfo />
        <WarehouseInventoryList />
      </div>
    </>
  );
}
