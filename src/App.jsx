import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Authentication from './routes/auth/Authentification';
import Dashboard from './routes/dashboard/Dashboard';

function App() {
  // État pour savoir si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // État pour stocker le nom d'utilisateur
  const [userUsername, setUserUsername] = useState('');

  // useEffect s'exécute au chargement du composant
  useEffect(() => {
    // Récupérer le token depuis le localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Si un token existe, vérifier s'il est valide
    if (accessToken) {
      axios.post('/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // Connexion réussie
        setIsLoggedIn(true);
        setUserUsername(response.data.username);
      })
      .catch((error) => {
        // Token invalide, l'utilisateur reste déconnecté
        console.log('Authentication failed:', error);
      });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <Authentication
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      )}
    </div>
  );
}

export default App;
