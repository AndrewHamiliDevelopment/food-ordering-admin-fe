import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ api }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSection, setSelectedSection] = useState('Personal Information');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [productCategory, setProductCategory] = useState('All');
  

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
  };

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
        editProduct(newProduct);
      } else {
        addProduct(newProduct);
      }

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
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, category: newCategory } : product
    );
    editProduct(updatedProducts);
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-info">
          <div className="profile-pic-container">
            <label
              htmlFor="file-upload"
              className="profile-pic"
              style={{ backgroundImage: `url(${profileImage || 'default-profile.png'})` }}
            >
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            <div className="profile-actions">
              <FaEdit className="edit-icon" onClick={() => document.getElementById('file-upload').click()} />
              <FaTrash className="delete-icon" onClick={handleDeleteImage} />
            </div>
          </div>
          <h2>Kail Hamili</h2>
        </div>
        <nav>
          <ul>
            {['Personal Information', 'User Management', 'Product Management', 'Sales Report', 'Transactions', 'Riders Management'].map((item) => (
              <li key={item} className={selectedSection === item ? 'active' : ''} onClick={() => handleSectionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>



      <main className="profile-form">
        {selectedSection === 'Personal Information' && (
          <>
            <div className="profile-header">
              <h2>Personal Information</h2>
              <button className="edit-button">Edit</button>
            </div>
            <div className="personal-info-container">
              <div className="info-group">
                <label>First Name</label>
                <span>Kail</span>
              </div>
              <div className="info-group">
                <label>Last Name</label>
                <span>Hamili</span>
              </div>
              <div className="info-group">
                <label>Date of Birth</label>
                <span>12-10-1990</span>
              </div>
              <div className="info-group">
                <label>Email Address</label>
                <span>info@company.com</span>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <span>(+62) 821 2554-5846</span>
              </div>
              <div className="info-group">
                <label>User Role</label>
                <span>Admin</span>
              </div>
            </div>
          </>
        )}



        {selectedSection === 'Product Management' && (
          <>
              <h2>Product Management</h2>
            <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>Add Product</button>
            <input
              type="text"
              placeholder="Search product... 🔍"
              className="search-bar"
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
                {products
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
          </>
        )}
      

      

      {selectedSection === "User Management" && (
  <>
    <h2>User Management</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Confirmed</th>
          <th>Roles</th>
          <th>Other Permissions</th>
          <th>Created</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Kail Hamili</td>
          <td>admin@admin.com</td>
          <td><span className="status-yes">Yes</span></td>
          <td>Administrator</td>
          <td>None</td>
          <td>1 minute ago</td>
          <td>1 minute ago</td>
          <td>
            <button className="edit-btn">✏️</button>
            <button className="refresh-btn">🔄</button>
            <button className="pause-btn">⏸️</button>
            <button className="delete-btn">❌</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Default User</td>
          <td>guest@guest.com</td>
          <td><span className="status-yes">Yes</span></td>
          <td>User</td>
          <td>None</td>
          <td>1 minute ago</td>
          <td>1 minute ago</td>
          <td>
            <button className="edit-btn">✏️</button>
            <button className="refresh-btn">🔄</button>
            <button className="pause-btn">⏸️</button>
            <button className="delete-btn">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </>
)}
</main>

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

export default Profile;