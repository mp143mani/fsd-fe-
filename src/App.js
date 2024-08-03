import { useState } from "react";
import "./App.css";
import Addproduct from "./components/Addproduct";
import { ProductDisplay } from "./components/ProductDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProduct from "./components/EditProduct";

function App() {
  const [productData, setProductData] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route
            path="/products/addProduct"
            element={
              <Addproduct
                productData={productData}
                setProductData={setProductData}
              />
            }
          />
          <Route path="/products/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
