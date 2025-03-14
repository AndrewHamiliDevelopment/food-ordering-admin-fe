import React, { useState } from "react";
import { Modal, Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import "./ProductManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Burger", price: 99, image: "burger.jpg", category: "Fast Food" },
    { id: 2, name: "Pizza", price: 199, image: "pizza.jpg", category: "Fast Food" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("All");

  const handleProductImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const handleAddOrEditProduct = () => {
    if (productName && productPrice && productImage) {
      const newProduct = {
        id: editProductId || Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        category: productCategory,
      };

      if (isEditing) {
        setProducts(products.map((p) => (p.id === editProductId ? newProduct : p)));
      } else {
        setProducts([...products, newProduct]);
      }

      resetForm();
      setShowModal(false);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setProductCategory(product.category);
    setEditProductId(product.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setProductCategory("All");
    setEditProductId(null);
    setIsEditing(false);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product Management</h2>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Button className="add-product-btn w-100" onClick={() => setShowModal(true)}>Add Product</Button>
        </Col>
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search product... 🔍"
            className="search-bar-product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product) => (
                <tr key={product.id}>
                  <td><img src={product.image} alt={product.name} className="product-img" /></td>
                  <td>{product.name}</td>
                  <td>₱{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEditProduct(product)}>✏️</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>❌</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="product-modal">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProductImageUpload} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Fast Food">Fast Food</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddOrEditProduct}>{isEditing ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
