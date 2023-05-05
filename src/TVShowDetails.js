import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TVShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    seats: 1
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setShow(response.data);
    };
    fetchShow();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('https://fakebookingapi.com/bookings', formData);
    setFormSubmitted(true);
    localStorage.setItem('bookingData', JSON.stringify(formData));
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    const storedBookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (storedBookingData) {
      setFormData(storedBookingData);
    }
  }, []);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      <img src={show.image?.medium} alt={show.name} />
      <p>{show.summary}</p>
      <p>Genres: {show.genres.join(', ')}</p>
      <p>Language: {show.language}</p>
      <p>Status: {show.status}</p>
      {!formSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          <h2>Book your seats:</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="seats">Number of seats:</label>
            <input type="number" id="seats" name="seats" min="1" max="10" value={formData.seats} onChange={handleInputChange} required />
          </div>
          <button type="submit">Book now</button>
        </form>
      ) : (
        <p>Thank you for your booking!</p>
      )}
    </div>
  );
};

export default TVShowDetails;
