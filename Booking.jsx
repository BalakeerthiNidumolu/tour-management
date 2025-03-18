import React, { useState, useContext } from "react";
import "./Booking.css";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, ListGroupItem, Button, ListGroup } from "reactstrap";
import { loginContext } from "../../contexts/loginContext"; // Import login context

function Booking({ tour, avgRating }) {
  const { price, reviews, title, id } = tour; // Use tour.id directly
  const navigate = useNavigate();
  const { currentUser } = useContext(loginContext); // Get logged-in user

  const [booking, setBooking] = useState({
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => {
      const updatedBooking = { ...prev, [e.target.id]: e.target.value };
      console.log("Updated Booking State:", updatedBooking); // 🔍 Debugging
      return updatedBooking;
    });
  };
  

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return alert("Please sign in to proceed with booking.");
    }

    const bookingData = {
      tourId: id, // Send tour ID
      email: currentUser.email, // Logged-in user’s email
      fullName: booking.fullName,
      phone: booking.phone,
      guestSize: booking.guestSize,
      bookAt: booking.bookAt,
    };

    try {
      const res = await fetch("http://localhost:4000/bookings-api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Send auth token
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (result.message!=="Booking successful!") {
        return alert(result.message);
      }

      alert("Booking successful!");
      navigate("/thank-you");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price}<span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-line"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} />
            <input type="number" placeholder="Guests" id="guestSize" required min="1" onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> {booking.guestSize} {booking.guestSize > 1 ? "people" : "person"}
            </h5>
            <span>${Number(price) * Number(booking.guestSize)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default Booking;
