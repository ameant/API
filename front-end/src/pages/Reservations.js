import React, { useState, useEffect } from "react";
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://port-de-plaisance-russell.onrender.com/reservations");
        setReservations(response.data);
      } catch (err) {
        alert("Erreur lors de l'affichage de la liste des réservations");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Liste des réservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            {reservation.catwayNumber} {reservation.clientName}
            {reservation.boatName} du {reservation.checkIn} au
            {reservation.checkOut}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
