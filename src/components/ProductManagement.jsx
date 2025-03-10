import React, { useState, useEffect } from 'react';
import "./ProductManagement.css";


const ProductManagement = ({
  products,
  addProduct,
  deleteProduct,
  editProduct,
  isModalOpen,
  setIsModalOpen,
  productImage,
  setProductImage,
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  searchTerm,
  setSearchTerm,
  editProductId,
  setEditProductId,
  productCategory,
  setProductCategory,
}) => {

  // Guard against undefined or null products
  const safeProducts = Array.isArray(products) ? products : [];

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

      if (editProductId) {
        // Editing an existing product
        editProduct(newProduct);
      } else {
        // Adding a new product
        addProduct(newProduct);
      }

      // Reset form fields after saving
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setEditProductId(null);
      setProductCategory('All');
      setIsModalOpen(false);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setProductCategory(product.category);
    setEditProductId(product.id);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (productId, newCategory) => {
    const updatedProducts = safeProducts.map((product) =>
      product.id === productId ? { ...product, category: newCategory } : product
    );

    // Assuming editProduct updates a single product
    const updatedProduct = updatedProducts.find((product) => product.id === productId);
    editProduct(updatedProduct);
  };

  return (
    <div>
      <h2>Product Management</h2>
      <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>Add Product</button>
      <input
        type="text"
        placeholder="Search product... 🔍"
        className="search-bar-product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="product-table">
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
          {safeProducts
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} className="product-img" /></td>
                <td>{product.name}</td>
                <td>₱{product.price}</td>
                <td>
                  <select value={product.category} onChange={(e) => handleCategoryChange(product.id, e.target.value)}>
                    <option key="All" value="All">All</option>
                    <option key="Fast Food" value="Fast Food">Fast Food</option>
                  </select>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <h3>{editProductId ? 'Edit Product' : 'Add Product'}</h3>
          <input type="file" accept="image/*" onChange={handleProductImageUpload} />
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
            <option key="All" value="All">All</option>
            <option key="Fast Food" value="Fast Food">Fast Food</option>
          </select>
          <button onClick={handleAddOrEditProduct}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
