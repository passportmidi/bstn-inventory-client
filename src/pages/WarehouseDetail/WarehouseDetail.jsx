import WarehouseDetailsInfo from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
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
