import "./WarehouseList.scss";

function WarehouseList() {
  return (
    <table>
      <thead>
        <tr>
          <th>Warehouse</th>
          <th>Address</th>
          <th>Contact Name</th>
          <th>Contact Information</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Manhattan</td>
          <td>503 Broadway, New York, USA</td>
          <td>Parmin Aujla</td>
          <td>
            +1 (629) 555-0129
            <br />
            paujla@instock.com
          </td>
          <td>Icons</td>
        </tr>
      </tbody>
    </table>
  );
}

export default WarehouseList;
