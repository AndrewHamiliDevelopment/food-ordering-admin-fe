import React, { useState } from "react";
import "./RidersManagement.css";

const RidersManagement = () => {
  const [transactions] = useState([
    {
      ID: "11",
      Name: "Jin yiang",  
      Vehicle: "Motorcycle",
      Email: "jinyiang@yahoo.com",
      AccountStatus: "Active",
      status: "Ongoing",
      amount: "1x Burger",
      Total: "₱ 100.00",
    },
  
  ]);

  return (
    <div className="transactions">
      <h2>Riders Management</h2>
      <div className="filters">
        <div className="filter-group">
          <label>From</label>
          <input type="date" />
          <label>To</label>
          <input type="date" />
        </div>
        <select>
          <option>Account Status</option>
          <option>Active</option>
          <option>Deactivated</option>
        </select>
        <select>
          <option>Vehicle Type</option>
          <option>4 Wheels</option>
          <option>2 Wheels</option>

        </select>
        
        <input type="text" placeholder="Rider ID No." />
        <button className="apply-btn">Search</button>
        <button className="apply-btn">Add Rider</button>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Vehicle</th>
            <th>Email</th>
            <th>Account Status</th>
            <th>Other Permissions</th>
            <th>Created</th>
            <th>Last Update</th>
            <th>Actions</th>


            

            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.ID}</td>
              <td>{txn.Name}</td>
              <td>{txn.Vehicle}</td>
              <td>{txn.Email}</td>
              <td>
                <span className={`status ${txn.status.toLowerCase()}`}>
                  {txn.AccountStatus}
                </span>
              </td>
              <td>{txn.OtherPermissions}</td>
              <td>{txn.Created}</td>
              <td>{txn.LastUpdate}</td>
              <td>{txn.Actions}</td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RidersManagement;
