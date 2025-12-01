import { useState } from 'react';
import './movies.css';

function Tag({ genre, filter, genres, setGenres }) {
  // État pour savoir si le tag est sélectionné
  const [selected, setSelected] = useState(false);

  // Fonction pour gérer le clic sur le tag
  const handleTag = () => {
    if (selected) {
      // Si déjà sélectionné, on le retire de la liste
      setGenres(genres.filter((g) => g !== genre));
      setSelected(false);
    } else {
      // Sinon, on l'ajoute à la liste
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag ${selected ? 'selected' : ''}`}
      onClick={filter ? handleTag : undefined}
    >
      {genre}
    </li>
  );
}

export default Tag;
