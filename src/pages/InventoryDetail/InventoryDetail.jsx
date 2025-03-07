import InventoryDetailsInfo from "../../components/InventoryDetails/InventoryDetails";
import Header from "../../components/Header/Header";
import "./InventoryDetail.scss";
import Footer from "../../components/Footer/Footer";

export default function InventoryDetails() {
  return (
    <>
      <div className="inventory">
        <InventoryDetailsInfo />
      </div>
    </>
  );
}
