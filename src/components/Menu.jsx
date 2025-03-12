import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = ({ foodItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract categories and include "All" as a default category
  const categories = ["All", ...new Set(foodItems.map(item => item.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categories.length === 0) return;

    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    const searchFromURL = queryParams.get("search");

    if (categoryFromURL && categories.includes(categoryFromURL)) {
      setSelectedCategory(categoryFromURL);
    } else {
      setSelectedCategory(categories[0]);
    }

    if (searchFromURL) {
      setSearchQuery(searchFromURL);
    }
  }, [location.search, foodItems]);

  const filteredItems = foodItems.filter((item) => {
    return (selectedCategory === "All" || item.category === selectedCategory) &&
           item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");

    const params = new URLSearchParams(location.search);
    params.set("category", category);
    params.delete("search");
    navigate({ search: params.toString() });
  };

  return (
    <div className="container py-4">
      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Tabs */}
      <ul className="nav nav-tabs mb-3 overflow-auto flex-nowrap" style={{ whiteSpace: "nowrap" }}>
        {categories.map((category, index) => (
          <li key={index} className="nav-item">
            <button
              className={`nav-link ${selectedCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Food Items Grid */}
      <div className="row">
        {filteredItems.length === 0 ? (
          <p className="text-center w-100">No items found for your search.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h6 className="card-title fw-bold">{item.name}</h6>
                  <p className="card-text text-muted">₱ {item.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
