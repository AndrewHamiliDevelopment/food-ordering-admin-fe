import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUser, FaUsers, FaBox, FaChartBar, FaMoneyBill, FaMotorcycle } from 'react-icons/fa';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
            <li><button className="nav-button" onClick={() => navigate('/profile/personal-information')}><FaUser className="nav-icon" /> Personal Information</button></li>
            <li><button className="nav-button" onClick={() => navigate('/profile/user-management')}><FaUsers className="nav-icon" /> User Management</button></li>
            <li><button className="nav-button" onClick={() => navigate('/profile/product-management')}><FaBox className="nav-icon" /> Product Management</button></li>
            <li><button className="nav-button" onClick={() => navigate('/profile/sales-report')}><FaChartBar className="nav-icon" /> Sales Report</button></li>
            <li><button className="nav-button" onClick={() => navigate('/profile/transactions')}><FaMoneyBill className="nav-icon" /> Transactions</button></li>
            <li><button className="nav-button" onClick={() => navigate('/profile/riders-management')}><FaMotorcycle className="nav-icon" /> Riders Management</button></li>
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
