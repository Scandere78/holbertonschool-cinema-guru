import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle
}) {
  // Liste de tous les genres disponibles
  const allGenres = [
    'action',
    'drama',
    'comedy',
    'biography',
    'romance',
    'thriller',
    'war',
    'history',
    'sport',
    'sci-fi',
    'documentary',
    'crime',
    'fantasy'
  ];

  // Options de tri
  const sortOptions = ['latest', 'oldest', 'highestrated', 'lowestrated'];

  return (
    <div className="filter">
      {/* Barre de recherche */}
      <SearchBar title={title} setTitle={setTitle} />

      {/* Inputs pour les années */}
      <div className="filter-inputs">
        <Input
          label="Min Year"
          type="number"
          value={minYear}
          setValue={setMinYear}
          inputAttributes={{ min: 1900, max: 2024 }}
        />
        <Input
          label="Max Year"
          type="number"
          value={maxYear}
          setValue={setMaxYear}
          inputAttributes={{ min: 1900, max: 2024 }}
        />
      </div>

      {/* Select pour le tri */}
      <SelectInput
        label="Sort By"
        options={sortOptions}
        value={sort}
        setValue={setSort}
      />

      {/* Tags des genres */}
      <ul className="filter-tags">
        {allGenres.map((genre, index) => (
          <Tag
            key={index}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
}

export default Filter;
