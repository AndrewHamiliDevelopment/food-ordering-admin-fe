import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUser, FaUsers, FaBox, FaChartBar, FaMoneyBill, FaMotorcycle, FaBars } from 'react-icons/fa';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PersonalInformation from './PersonalInformation';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import SalesReport from './SalesReport';
import Transactions from './Transactions';
import RidersManagement from './RidersManagement';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ products, addProduct, deleteProduct, editProduct }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [productCategory, setProductCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="d-flex">
      {/* Sidebar */}
      <aside className={`sidebar bg-light p-3 ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}>
        <div className="profile-info text-center">
          <div className="profile-pic-container position-relative">
            <label htmlFor="file-upload" className="profile-pic" style={{ backgroundImage: `url(${profileImage || 'default-profile.png'})` }}>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            <div className="profile-actions position-absolute w-100 d-flex justify-content-center">
              <FaEdit className="edit-icon me-2" onClick={() => document.getElementById('file-upload').click()} />
              <FaTrash className="delete-icon text-danger" onClick={handleDeleteImage} />
            </div>
          </div>
          <h2 className="mt-2">Kail Hamili</h2>
        </div>
        <nav>
          <ul className="list-unstyled">
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/personal-information')}><FaUser className="me-2" /> Personal Information</button></li>
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/user-management')}><FaUsers className="me-2" /> User Management</button></li>
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/product-management')}><FaBox className="me-2" /> Product Management</button></li>
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/sales-report')}><FaChartBar className="me-2" /> Sales Report</button></li>
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/transactions')}><FaMoneyBill className="me-2" /> Transactions</button></li>
            <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/profile/riders-management')}><FaMotorcycle className="me-2" /> Riders Management</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="profile-form flex-grow-1 p-3">
        <button className="btn btn-primary d-md-none mb-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars /> Menu
        </button>
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