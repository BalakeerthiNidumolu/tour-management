import React, { useRef } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../shared/search-bar.css";
import tourData from "../assets/data/tours"; // Importing tours data

function SearchBar() {
  const locationRef = useRef("");
  const distanceRef = useRef("");
  const maxGroupSizeRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = () => {
    const location = locationRef.current.value.trim().toLowerCase();
    const distance = parseInt(distanceRef.current.value.trim(), 10);
    const maxGroupSize = parseInt(maxGroupSizeRef.current.value.trim(), 10);

    if (!location || isNaN(distance) || isNaN(maxGroupSize)) {
      alert("Please enter all search fields correctly.");
      return;
    }

    // Find the first matching tour
    const foundTour = tourData.find(
      (tour) =>
        tour.city.toLowerCase().includes(location) && // Allows partial matches (e.g., "Lon" for "London")
        tour.distance <= distance &&
        tour.maxGroupSize >= maxGroupSize
    );

    if (!foundTour) {
      alert("No tour found matching the criteria.");
      return;
    }

    // Navigate to the matched tour’s details page
    navigate(`/tours/${foundTour.id}`);
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          {/* Location Input */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where are you going?" ref={locationRef} />
            </div>
          </FormGroup>

          {/* Distance Input */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Max Distance (Km)</h6>
              <input type="number" placeholder="Enter max distance" ref={distanceRef} />
            </div>
          </FormGroup>

          {/* Max Group Size Input */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Min Group Size</h6>
              <input type="number" placeholder="Enter min group size" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          {/* Search Button */}
          <span className="search__icon" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
}

export default SearchBar;
