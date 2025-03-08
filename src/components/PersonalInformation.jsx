import React from 'react';

const PersonalInformation = () => {
  return (
    <>
      <div className="profile-header">
        <h2>Personal Information</h2>
        <button className="edit-button">Edit Info </button>
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

          <div className="profile-address">
          <h2>Address</h2>
        </div>
        <div className="personal-info-container">
          <div className="info-group">
            <label>Blk Lot</label>
            <span>blk 17 lot 3 </span>
          </div>
          <div className="info-group">
            <label>City </label>
            <span>Fairview City</span>
          </div>
          <div className="info-group">
            <label>Province</label>
            <span>Manila</span>
            <span></span>
          </div>
          <div className="info-group">
            <label>Street</label>
            <span>St peter st.</span>
          </div>
          <div className="info-group">
            <label>Postal Code</label>
            <span>1400</span>
          </div>
        </div>
      </>
  );
};

export default PersonalInformation;