import { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Login from './Login';
import Register from './Register';
import Button from '../../components/general/Button';

function Authentication({ setIsLoggedIn, setUserUsername }) {
  // État pour switcher entre Login et Register
  const [_switch, setSwitch] = useState(true);

  // États pour les champs du formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();

    // Détermine l'URL selon le mode (login ou register)
    const url = _switch ? '/api/auth/login' : '/api/auth/register';

    // Envoie la requête au serveur
    axios.post(url, { username, password })
      .then((response) => {
        // Récupère le token de la réponse
        const token = response.data.accessToken;

        // Stocke le token dans le localStorage
        localStorage.setItem('accessToken', token);

        // Met à jour les états dans App.jsx
        setUserUsername(username);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log('Authentication error:', error);
      });
  };

  return (
    <div className="auth-container">
      {/* Bind handleSubmit au formulaire */}
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Boutons pour switcher */}
        <div className="auth-buttons">
          <Button
            label="Sign In"
            className={_switch ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setSwitch(true);
            }}
          />
          <Button
            label="Sign Up"
            className={!_switch ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setSwitch(false);
            }}
          />
        </div>

        {/* Affiche Login ou Register selon _switch */}
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
}

export default Authentication;
