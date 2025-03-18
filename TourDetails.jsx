import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import '../styles/tour-details.css';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import tourData from '../assets/data/tours';

const TourDetails = () => {
  const { id } = useParams(); // Get tour ID from URL
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);

  // Find tour by ID
  const tour = tourData.find((tour) => tour.id === id);

  // Ensure tour exists before destructuring
  if (!tour) {
    return <h4 className="text-center pt-5">Tour not found</h4>;
  }

  const { photo, title, desc, price, address, reviews = [], city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Handle review submission (no API call since data is static)
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!reviewText || !tourRating) {
      return alert('Please provide a rating and review text.');
    }

    alert('Review submitted! (This is static data, so it won’t persist)');
  };

  

  return (
    <>
      <section>
        <Container>
          <Row>
            {/* LEFT SIDE */}
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-line" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating || 'Not rated'}
                      {totalRating > 0 && <span>({reviews?.length})</span>}
                    </span>
                    <span>
                      <i className="ri-map-pin-line"></i> {address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-time-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ${price} / per person
                    </span>
                    <span>
                      <i className="ri-map-pin-line"></i> {distance} K/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* REVIEWS SECTION */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span key={num} onClick={() => setTourRating(num)}>
                          {num} <i className="ri-star-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                      <button className="btn primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="User Avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username || 'Anonymous'}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="ri-star-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            {/* RIGHT SIDE */}
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default TourDetails;
