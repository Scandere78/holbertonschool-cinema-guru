import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';

function WatchLater() {
  // État pour les films à regarder plus tard
  const [movies, setMovies] = useState([]);

  // Charge la liste au montage
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    axios.get('/api/titles/watchlater/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => {
      console.log('Error loading watch later:', error);
    });
  }, []);

  return (
    <div className="page">
      <h1>Movies to watch later</h1>

      {/* Liste des films à regarder plus tard */}
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default WatchLater;
