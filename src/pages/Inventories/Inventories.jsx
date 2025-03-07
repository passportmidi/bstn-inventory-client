import InventoryList from "../../components/InventoryList/InventoryList";
import "./Inventories.scss";

export default function Inventories() {
  return (
    <>
      <div className="warehouse">
        <InventoryList />
      </div>
    </>
  );
}
