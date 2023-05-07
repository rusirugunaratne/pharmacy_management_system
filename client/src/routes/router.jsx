import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import HomePage from "../components/HomePage";
import Cart from "../components/cart/Cart";
import { useEffect, useRef, useState } from "react";
import Checkout from "../components/cart/Checkout";
import Admin from "../components/admin/Admin";

export function Router() {
  const [items, setItems] = useState([]);
  console.log("Items in router", items);
  return (
    <BrowserRouter>
      <TopBar items={items} />
      <Routes>
        <Route
          path='/'
          element={<HomePage items={items} setItems={setItems} />}
        />
        <Route
          path='/cart'
          element={<Cart items={items} setItems={setItems} />}
        />
        <Route
          path='/checkout'
          element={<Checkout items={items} setItems={setItems} />}
        />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
