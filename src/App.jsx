import "./App.scss";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Warehouses from './pages/Warehouses/Warehouses';
import WarehouseDetail from './pages/WarehouseDetail/WarehouseDetail';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import Inventory from './pages/Inventory/Inventory';
import InventoryDetail from './pages/InventoryDetail/InventoryDetail';
import AddInventory from './pages/AddInventory/AddInventory';
import EditInventory from './pages/EditInventory/EditInventory';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
          <Routes>
            {/* Warehouses Routes */}
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouse/:id" element={<WarehouseDetail />} />
            <Route path="/warehouse/add" element={<AddWarehouse />} />
            <Route path="/warehouse/:id/edit" element={<EditWarehouse />} />

            {/* Inventory Routes */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<InventoryDetail />} />
            <Route path="/inventory/add" element={<AddInventory />} />
            <Route path="/inventory/:id/edit" element={<EditInventory />} />

            {/* Default Route */}
            <Route path="/" element={<Warehouses />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
