import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', 
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Une erreur s\'est produite lors de la connexion.');
    }
  };

  return (
    <div>
      <h1>Bienvenue au Port de Plaisance Russell</h1>
      <p>Cette application permet la gestion des réservations du port de plaisance Russell.
         Elle permet de créer, lire, mettre à jour et supprimer des catways
         ainsi que leurs réservations associées.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>

      <p><a href="/docs">Voir la documentation de l'API</a></p>
    </div>
  );
};

export default Home;
