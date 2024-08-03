import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { API } from "../global";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API}/products/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((product) => setProduct(product));
  }, []);
  if (product) {
    return <EditProductForm product={product} />;
  } else {
    return "Loading....";
  }
}

function EditProductForm({ product }) {
  const [name, setName] = useState(product.name);
  const [productImage, setProductImage] = useState(product.productImage);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const updatedProducts = {
      name: name,
      productImage: productImage,
      description: description,
      price: price,
    };

    fetch(`${API}/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProducts),
    })
      .then((data) => data.json())
      .then(() => navigate("/"));
  };

  return (
    <>
      <h1>Editproduct</h1>
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={productImage}
              onChange={(event) => setProductImage(event.target.value)}
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Col>
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}
export default EditProduct;
