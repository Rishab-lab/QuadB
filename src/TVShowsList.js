import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TVShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setShows(response.data);
    };
    fetchShows();
  }, []);

  return (
    <div>
      <h1>TV Shows List</h1>
      {shows.map((show) => (
        <div key={show.show.id}>
          <Link to={`/shows/${show.show.id}`}>
            <h2>{show.show.name}</h2>
          </Link>
          <p>{show.show.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default TVShowsList;
