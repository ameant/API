import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Catway = () => {
  const { id } = useParams();
  const [catway, setCatway] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatwayDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/catways/${id}`);
        setCatway(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des détails du catway");
      } finally {
        setLoading(false);
      }
    };

    fetchCatwayDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails du catway...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!catway) {
    return <p>Aucun catway trouvé avec l'ID fourni</p>;
  }

  return (
    <div>
      <h1>Détails du catway</h1>
      <div>
        <p>ID : {catway._id}</p>
        <p>Numéro du catway : {catway.catwayNumber}</p>
        <p>Type : {catway.type}</p>
        <p>État : {catway.catwayState}</p>
      </div>
    </div>
  );
};

export default Catway;
