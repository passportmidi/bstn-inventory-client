import InventoryDetailsInfo from "../../components/InventoryDetails/InventoryDetails";
import Header from "../../components/Header/Header";
import "./InventoryDetail.scss";

export default function InventoryDetails() {
  return (
    <>
      <Header />
      <div className="inventory">
        <InventoryDetailsInfo />
      </div>
    </>
  );
}
