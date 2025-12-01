import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';

function Favorites() {
  // État pour les films favoris
  const [movies, setMovies] = useState([]);

  // Charge les favoris au montage
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    axios.get('/api/titles/favorite/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => {
      console.log('Error loading favorites:', error);
    });
  }, []);

  return (
    <div className="page">
      <h1>Movies you like</h1>

      {/* Liste des films favoris */}
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
