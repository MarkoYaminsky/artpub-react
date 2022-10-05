import React from "react";
import { Spots, Header, Footer } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Catalog, Item } from "./pages";
import { NotFound } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Spots />
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:articleId" element={<Item />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
