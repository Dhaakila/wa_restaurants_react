import RestaurantList from "./RestaurantList"
import RatingsByRestaurant from "./RatingsByRestaurant";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { useState } from "react";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar (optional) */}
        <nav>
          <ul>
            <li>
              <Link to="/">Restaurants</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/:id/ratings" element={<RatingsByRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;