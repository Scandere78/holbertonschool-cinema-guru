import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';

function HomePage() {
  // États pour les films et les filtres
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  // Fonction pour charger les films
  const loadMovies = (pageNum) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.get('/api/titles/advancedsearch', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        minYear,
        maxYear,
        genres: genres.join(','),
        title,
        sort,
        page: pageNum
      }
    })
    .then((response) => {
      if (pageNum === 1) {
        setMovies(response.data.titles);
      } else {
        setMovies([...movies, ...response.data.titles]);
      }
    })
    .catch((error) => {
      console.log('Error loading movies:', error);
    });
  };

  // Charge les films au montage et quand les filtres changent
  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  // Gère le clic sur "Load More"
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="page">
      {/* Filtres */}
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />

      {/* Liste des films */}
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ul>

      {/* Bouton Load More */}
      <Button
        label="Load More.."
        className="load-more"
        onClick={handleLoadMore}
      />
    </div>
  );
}

export default HomePage;
