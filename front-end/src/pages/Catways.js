import React, { useState, useEffect } from "react";
import http from "../http-common";

const Catways = () => {
  const [catways, setCatways] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await http.get("/catways");
        setCatways(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Chargement en cours...</div>;

  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <h1>Liste des catways</h1>
      <ul>
        {catways.map((catway) => (
          <li key={catway._id}>
            {catway.catwayNumber} ({catway.type}): {catway.catwayState}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catways;
