import "./WarehouseList.scss";
import deleteLogo from "../../assets/icons/delete_outline-24px.svg";
import editLogo from "../../assets/icons/edit-24px.svg";

function WarehouseList() {
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell table__cell--heading">Warehouse</th>
          <th className="table__cell table__cell--heading">Address</th>
          <th className="table__cell table__cell--heading">Contact Name</th>
          <th className="table__cell table__cell--heading">
            Contact Information
          </th>
          <th className="table__cell table__cell--heading">Actions</th>
        </tr>
      </thead>
      <tbody className="table__body">
        <tr className="table__row">
          <td className="table__cell">Manhattan</td>
          <td className="table__cell">503 Broadway, New York, USA</td>
          <td className="table__cell">Parmin Aujla</td>
          <td className="table__cell">
            +1 (629) 555-0129
            <br />
            paujla@instock.com
          </td>
          <td className="table__cell">
            <img src={deleteLogo} alt="Delete" />
            <img src={editLogo} alt="Edit" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default WarehouseList;
