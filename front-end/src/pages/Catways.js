import React, { useState, useEffect } from "react";
import axios from "axios";

const Catways = () => {
  const [catways, setCatways] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/catways");
        setCatways(response.data);
      } catch (err) {
        alert("Erreur lors de l'affichage de la liste des catways");
      }
    };
    fetchData();
  }, []);

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
