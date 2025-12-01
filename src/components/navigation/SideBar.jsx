import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar, faClock, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';
import Activity from '../Activity';

function SideBar() {
  // États du composant
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour changer de page
  const setPage = (pageName) => {
    setSelected(pageName);

    // Redirige vers la bonne page
    switch (pageName) {
      case 'Home':
        navigate('/home');
        break;
      case 'Favorites':
        navigate('/favorites');
        break;
      case 'Watch Later':
        navigate('/watchlater');
        break;
      default:
        navigate('/home');
    }
  };

  // Récupère les activités au chargement
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    axios.get('/api/activity', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      setActivities(response.data);
    })
    .catch((error) => {
      console.log('Error fetching activities:', error);
    });
  }, []);

  return (
    <nav className={`sidebar ${small ? 'small' : ''}`}>
      {/* Bouton pour agrandir/réduire */}
      <span className="sidebar-toggle" onClick={() => setSmall(!small)}>
        <FontAwesomeIcon icon={small ? faArrowRight : faArrowLeft} />
      </span>

      {/* Navigation principale */}
      <ul className="sidebar-nav">
        <li
          className={selected === 'Home' ? 'active' : ''}
          onClick={() => setPage('Home')}
        >
          <FontAwesomeIcon icon={faHouse} />
          {!small && <span>Home</span>}
        </li>
        <li
          className={selected === 'Favorites' ? 'active' : ''}
          onClick={() => setPage('Favorites')}
        >
          <FontAwesomeIcon icon={faStar} />
          {!small && <span>Favorites</span>}
        </li>
        <li
          className={selected === 'Watch Later' ? 'active' : ''}
          onClick={() => setPage('Watch Later')}
        >
          <FontAwesomeIcon icon={faClock} />
          {!small && <span>Watch Later</span>}
        </li>
      </ul>

      {/* Section activités */}
      {!small && (
        <>
          <span
            className="activities-toggle"
            onClick={() => setShowActivities(!showActivities)}
          >
            {showActivities ? 'Hide Activities' : 'Show Activities'}
          </span>

          {showActivities && (
            <ul className="activities-list">
              {activities.slice(0, 10).map((activity, index) => (
                <Activity key={index} activity={activity} />
              ))}
            </ul>
          )}
        </>
      )}
    </nav>
  );
}

export default SideBar;
