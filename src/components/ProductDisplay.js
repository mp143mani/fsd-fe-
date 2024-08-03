import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

export function ProductDisplay() {
  const [productData, setProductData] = useState([]);

  const getProducts = () => {
    axios.get(`${API}/products`).then((res) => {
      if (res.status === 401) {
        console.log("Data Not Found");
      }
      console.log(res.data);
      setProductData(res.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API}/products/` + id).then((res) => {
      if (res.status === 200) {
        getProducts();
      }
    });
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
