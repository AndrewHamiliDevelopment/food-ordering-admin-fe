import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./ProductManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Api } from "/src/api.ts";
import firebase from "../firebase";

const API_URL = "https://foodordering-staging.andrewhamili.com"; // API URL
const user = firebase.auth().currentUser;
const api = new Api(API_URL, user);

const ProductManagement = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("Fast Food");

  // Fetch products from API
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.getProducts({ page: 1, size: 10 }); // Use getProducts from api.ts
      return response.data.data; // Extract product list
    },
  });
  
  // Add Product Mutation
  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => await axios.post(API_URL, newProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  // Edit Product Mutation
  const editProductMutation = useMutation({
    mutationFn: async ({ id, updatedProduct }) => {
      return await api.axiosInstance.put(`/v1/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      return await api.axiosInstance.delete(`/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleProductImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const handleAddOrEditProduct = async () => {
    if (!productName || !productPrice || !productImage) return;

    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      category: productCategory,
    };

    if (isEditing) {
      editProductMutation.mutate({ id: editProductId, updatedProduct: newProduct });
    } else {
      addProductMutation.mutate(newProduct);
    }

    resetForm();
    setShowModal(false);
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
    deleteProductMutation.mutate(id);
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setProductCategory("Fast Food");
    setEditProductId(null);
    setIsEditing(false);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product Management</h2>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Button className="add-product-btn w-100" onClick={() => setShowModal(true)}>
            Add Product
          </Button>
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

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
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
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} className="product-img" />
                    </td>
                    <td>{product.name}</td>
                    <td>₱{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        ✏️
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}

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
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="Fast Food">Fast Food</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddOrEditProduct}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
