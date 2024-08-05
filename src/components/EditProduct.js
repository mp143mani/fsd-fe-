import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { API } from "../global";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    productImage: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API}/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      await response.json();
      navigate("/");
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  };

  return (
    <>
      <h1>Edit Product</h1>
      <Button onClick={() => navigate(-1)}>BACK</Button>
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>
            Product name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              name="name"
              placeholder="Enter Product name"
              type="text"
              value={product.name}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productImage" sm={2}>
            Product Image
          </Label>
          <Col sm={10}>
            <Input
              id="productImage"
              name="productImage"
              placeholder="Enter ProductImage"
              type="text"
              value={product.productImage}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Product Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              placeholder="Enter Description"
              type="text"
              value={product.description}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="price" sm={2}>
            Product Price
          </Label>
          <Col sm={10}>
            <Input
              id="price"
              name="price"
              placeholder="Enter Price"
              type="text"
              value={product.price}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}

export default EditProduct;
