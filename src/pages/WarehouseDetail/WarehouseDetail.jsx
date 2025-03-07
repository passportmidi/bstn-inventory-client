import Header from "../../components/Header/Header";
import WarehouseDetailsInfo from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import "./WarehouseDetail.scss";

export default function WarehouseDetails() {
  return (
    <>
      <Header />
      <div className="warehouse">
        <WarehouseDetailsInfo />
        <WarehouseInventoryList />
      </div>
    </>
  );
}
