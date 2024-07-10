import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`/reservations/${id}`);
        setReservation(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des détails de la réservation");
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails de la réservation ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reservation) {
    return <p>Aucune réservation trouvée avec l'ID fourni</p>;
  }

  return (
    <div>
      <h1>Détails de la réservation</h1>
      <div>
        <p>ID : {reservation._id}</p>
        <p>Numéro de la réservation : {reservation.catwayNumber}</p>
        <p>Nom du client : {reservation.clientName}</p>
        <p>Nom du bateau : {reservation.boatName}</p>
        <p>Du : {reservation.checkIn}</p>
        <p>Au : {reservation.checkOut}</p>
      </div>
    </div>
  );
};

export default Reservation;
