import React, { useState } from "react";
import "./Profile.css";

const Transactions = () => {
  const [transactions] = useState([
    {
      date: "12 Mar, 2021 21:12",
      invoice: "21031111110",
      rider: "Jin yiang",
      type: "Cash on Delivery",
      status: "Ongoing",
      amount: "1x Burger",
      Total: "₱ 100.00",
    },
    {
      date: "11 Mar, 2021 12:18",
      invoice: "21031100001",
      rider: "gilfoyle",
      type: "Online Payment",
      status: "Cancelled",
      amount: "1x Burger ",
      Total: "₱ 100.00",
    },

    {
      date: "11 Mar, 2021 12:18",
      invoice: "21031100001",
      rider: "gilfoyle",
      type: "Online Payment",
      status: "Paid",
      amount: "1x Burger ",
      Total: "₱ 100.00",
    },
    
  ]);

  return (
    <div className="transactions">
      <h2>Transaction History</h2>
      <div className="filters">
        <div className="filter-group">
          <label>From</label>
          <input type="date" />
          <label>To</label>
          <input type="date" />
        </div>
        <select>
          <option>All</option>
          <option>Online</option>
          <option>Cash on Delivery</option>
        </select>
        
        <select>
          <option>Paid</option>
          <option>Ongoing</option>
          <option>Canceled</option>

        </select>
        
        <input type="text" placeholder="Invoice No. or ID" />
        <button className="apply-btn">Apply</button>
        <button className="export-btn">Export</button>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Invoice No.</th>
            <th>Rider</th>
            <th>Payment Type</th>
            <th>Order Status</th>
            <th>Amount</th>
            <th>Total</th>


          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.date}</td>
              <td>{txn.invoice}</td>
              <td>{txn.rider}</td>
              <td>{txn.type}</td>
              <td>
                <span className={`status ${txn.status.toLowerCase()}`}>
                  {txn.status}
                </span>
              </td>
              <td>{txn.amount}</td>
              <td>{txn.Total}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transactions;
