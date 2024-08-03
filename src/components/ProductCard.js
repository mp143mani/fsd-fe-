import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function ProductCard({ value, handleDelete }) {
  const navigate = useNavigate();
  return (
    <Card className="card-style" style={{ width: "18rem" }}>
      <CardBody>
        <CardTitle>{value.name}</CardTitle>
      </CardBody>
      <img src={value.productImage} alt="products" width="100%" />
      <CardBody>
        <CardText>{value.description}</CardText>
        <CardText>Rs. {value.price}</CardText>
        <Button
          color="danger"
          onClick={() => navigate(`products/editProduct/${value.id}`)}
        >
          <AiOutlineEdit />
        </Button>
        <Button color="success" onClick={() => handleDelete(value.id)}>
          <AiFillDelete />
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
