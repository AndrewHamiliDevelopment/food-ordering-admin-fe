import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Route, Routes, Link } from 'react-router-dom';
import PersonalInformation from './PersonalInformation';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import SalesReport from './SalesReport';
import Transactions from './Transactions';
import RidersManagement from './RidersManagement';
import './Profile.css';

const Profile = ({ products, addProduct, deleteProduct, editProduct }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [productCategory, setProductCategory] = useState('All');

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
            <li><Link to="/profile/personal-information">Personal Information</Link></li>
            <li><Link to="/profile/user-management">User Management</Link></li>
            <li><Link to="/profile/product-management">Product Management</Link></li>
            <li><Link to="/profile/sales-report">Sales Report</Link></li>
            <li><Link to="/profile/transactions">Transactions</Link></li>
            <li><Link to="/profile/riders-management">Riders Management</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="profile-form">
        <Routes>
          <Route path="personal-information" element={<PersonalInformation />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="product-management" element={
            <ProductManagement
              products={products}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              productImage={productImage}
              setProductImage={setProductImage}
              productName={productName}
              setProductName={setProductName}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              editProductId={editProductId}
              setEditProductId={setEditProductId}
              productCategory={productCategory}
              setProductCategory={setProductCategory}
            />
          } />
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="riders-management" element={<RidersManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default Profile;
