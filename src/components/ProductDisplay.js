import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

export function ProductDisplay() {
  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      if (res.status === 401) {
        console.log("Data Not Found");
      } else {
        console.log(res.data);
        setProductData(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/products/` + id);
      if (res.status === 200) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <Container>
      <h1>ProductDisplay</h1>
      <br />
      <br />
      <Button onClick={() => navigate("/products/addProduct")}>
        Create Product
      </Button>
      {productData.map((item) => {
        return (
          <ProductCard key={item.id} value={item} handleDelete={handleDelete} />
        );
      })}
    </Container>
  );
}
