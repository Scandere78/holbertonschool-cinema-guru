import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Header({ userUsername, setIsLoggedIn }) {
  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    // Supprime le token du localStorage
    localStorage.removeItem('accessToken');

    // Met à jour l'état pour afficher la page d'authentification
    setIsLoggedIn(false);
  };

  return (
    <nav className="header">
      {/* Section gauche : avatar + bienvenue */}
      <div className="header-left">
        <img
          src="https://picsum.photos/100/100"
          alt="Avatar"
          className="header-avatar"
        />
        <p className="header-welcome">Welcome, {userUsername}!</p>
      </div>

      {/* Bouton logout */}
      <span className="logout" onClick={logout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        Logout
      </span>
    </nav>
  );
}

export default Header;
