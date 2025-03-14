import React from "react";
import "./SalesReport.css";

const SalesReport = () => {
  return (
  
    <div className="sales-report">
      <h2>Sales Report</h2>
      <div className="top-cards">
        <div className="card income">
          <h3>$53,000</h3>
          <p>Total Income</p>
        </div>
        <div className="card expense">
          <h3>67,045</h3>
          <p>Total Expense</p>
        </div>
        <div className="card visit">
          <h3>83,900</h3>
          <p>Total Visit</p>
        </div>
      </div>

      <div className="bottom-section">
        <div className="stats-container">
          <div className="stat">
            <h4>14,0000 <span>Overall Sales</span></h4>
            <p className="progress-text">42% higher than last month</p>
            <div className="progress-bar red"></div>
          </div>
          <div className="stat">
            <h4>34,789 <span>Total Expense</span></h4>
            <p className="progress-text">76% higher than last month</p>
            <div className="progress-bar purple"></div>
          </div>
          <div className="stat">
            <h4>46,567 <span>Visits</span></h4>
            <p className="progress-text">76% higher than last month</p>
            <div className="progress-bar green"></div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Statistics</h3>
          <div className="chart-buttons">
            <button>Month</button>
            <button>Week</button>
            <button className="active">All Time</button>
          </div>
          <div className="chart">
            {/* Chart goes here (Use a library like Recharts or Chart.js) */}
            <p>Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
