import React, { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data.message);
        window.location.href = '/dashboard'; // Or use React Router for navigation
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
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

      {/* <!-- Lien vers la documentation de l'API --> */}
      <p><a href="/docs">Voir la documentation de l'API</a></p>
    </div>
  );
};

export default Home;
