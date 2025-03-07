import "./Header.scss";
import logo1 from "../../../src/assets/logo/InStock-Logo_2x.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="nav">
        <div className="nav__wordmark">
          <img src={logo1} alt="wordmark" />
        </div>
        <div className="nav__links">
          <NavLink to="/warehouse" className="nav-link">
            Warehouses
          </NavLink>

          <NavLink to="/inventory" className="nav-link">
            Inventory
          </NavLink>
        </div>
      </nav>
      <div className="gap"></div>
    </>
  );
}
