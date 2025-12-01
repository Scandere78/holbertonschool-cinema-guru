import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import './movies.css';

function MovieCard({ movie }) {
  // États pour les favoris et watch later
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  // Récupère le statut des favoris et watch later au chargement
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // Vérifie si le film est dans les favoris
    axios.get('/api/titles/favorite/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      const favorites = response.data;
      const isInFavorites = favorites.some((fav) => fav.imdbId === movie.imdbId);
      setIsFavorite(isInFavorites);
    })
    .catch((error) => {
      console.log('Error fetching favorites:', error);
    });

    // Vérifie si le film est dans watch later
    axios.get('/api/titles/watchlater/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      const watchLaterList = response.data;
      const isInWatchLater = watchLaterList.some((item) => item.imdbId === movie.imdbId);
      setIsWatchLater(isInWatchLater);
    })
    .catch((error) => {
      console.log('Error fetching watch later:', error);
    });
  }, [movie.imdbId]);

  // Gère le clic sur les icônes
  const handleClick = (type) => {
    const accessToken = localStorage.getItem('accessToken');
    const url = `/api/titles/${type}/${movie.imdbId}`;

    if (type === 'favorite') {
      if (isFavorite) {
        // Retirer des favoris
        axios.delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(() => setIsFavorite(false))
        .catch((error) => console.log('Error:', error));
      } else {
        // Ajouter aux favoris
        axios.post(url, {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(() => setIsFavorite(true))
        .catch((error) => console.log('Error:', error));
      }
    } else if (type === 'watchlater') {
      if (isWatchLater) {
        // Retirer de watch later
        axios.delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(() => setIsWatchLater(false))
        .catch((error) => console.log('Error:', error));
      } else {
        // Ajouter à watch later
        axios.post(url, {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(() => setIsWatchLater(true))
        .catch((error) => console.log('Error:', error));
      }
    }
  };

  return (
    <li className="movie-card">
      {/* Icônes favoris et watch later */}
      <div className="movie-card-icons">
        <span
          className={`movie-card-icon ${isFavorite ? 'active' : ''}`}
          onClick={() => handleClick('favorite')}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span
          className={`movie-card-icon ${isWatchLater ? 'active' : ''}`}
          onClick={() => handleClick('watchlater')}
        >
          <FontAwesomeIcon icon={faClock} />
        </span>
      </div>

      {/* Image du film */}
      {movie.imageurls && movie.imageurls[0] && (
        <img
          src={movie.imageurls[0]}
          alt={movie.title}
          className="movie-card-image"
        />
      )}

      {/* Contenu */}
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-synopsis">{movie.synopsis}</p>

        {/* Genres */}
        <ul className="movie-card-genres">
          {movie.genres && movie.genres.map((genre, index) => (
            <li key={index} className="movie-card-genre">
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default MovieCard;
