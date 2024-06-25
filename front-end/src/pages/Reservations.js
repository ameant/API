import React, { useState, useEffect } from "react";
import http from "../http-common";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await http.get("/reservations");
        setReservations(response.data);
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
      <h1>Liste des réservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            {reservation.catwayNumber} ({reservation.clientName}):
            {reservation.boatName} du {reservation.checkIn} au
            {reservation.checkOut}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
