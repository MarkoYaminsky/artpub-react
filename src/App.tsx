import React from "react";
import { Spots, Header, Footer } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Catalog, Item, ContactUs } from "./pages";
import { NotFound } from "./pages";
import { Cart } from "./pages/Cart";
import { Provider } from "react-redux";
import { store } from "./redux";
import { Order } from "./pages/Order";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Spots />
          <Header />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:articleId" element={<Item />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/order" element={<Order />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
