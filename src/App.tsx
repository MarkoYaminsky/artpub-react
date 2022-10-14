import { useContext } from "react";
import { Spots, Header, Footer } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Catalog,
  Item,
  ContactUs,
  Cart,
  Login,
  Order,
  Registration,
  NotFound,
} from "./pages";
import { AppContext } from "./context";
function App() {
  const context = useContext(AppContext)
  return (
    <BrowserRouter>
      <>
        <Spots />
        {context?.isAuthenticated && <Header />}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:articleId" element={<Item />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/order" element={<Order />} />
        </Routes>
        {context?.isAuthenticated && <Footer />}
      </>
    </BrowserRouter>
  );
}

export default App;
