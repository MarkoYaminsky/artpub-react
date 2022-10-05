import React from "react";
import { Spots, Header, Footer } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Catalog } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Spots />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
