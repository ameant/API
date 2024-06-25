import React, { useState } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    id: ''
  });

  const [catwayData, setCatwayData] = useState({
    catwayNumber: '',
    type: '',
    catwayState: '',
    id: ''
  });

  const [reservationData, setReservationData] = useState({
    catwayNumber: '',
    clientName: '',
    boatName: '',
    checkIn: '',
    checkOut: '',
    reservationId: ''
  });

  const handleUserChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleCatwayChange = (e) => {
    setCatwayData({
      ...catwayData,
      [e.target.name]: e.target.value
    });
  };

  const handleReservationChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, url, data) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error in request');
      console.log('Request successful');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tableau de bord</h1>

      {/* Formulaire de création d'utilisateur */}
      <form onSubmit={(e) => handleSubmit(e, 'http://localhost:3001/users/add', userData)}>
        <h2>Créer un utilisateur</h2>
        <div>
          <label htmlFor="userName">Nom :</label>
          <input type="text" id="userName" name="name" value={userData.name} onChange={handleUserChange} required />
        </div>
        <div>
          <label htmlFor="userEmail">Email :</label>
          <input type="email" id="userEmail" name="email" value={userData.email} onChange={handleUserChange} required />
        </div>
        <div>
          <label htmlFor="userPassword">Mot de passe :</label>
          <input type="password" id="userPassword" name="password" value={userData.password} onChange={handleUserChange} required />
        </div>
        <button type="submit">Créer</button>
      </form>

      {/* Formulaire de modification d'utilisateur */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/users/${userData.id}`, userData)}>
        <h2>Modifier un utilisateur</h2>
        <div>
          <label htmlFor="editUserId">ID de l'utilisateur :</label>
          <input type="text" id="editUserId" name="id" value={userData.id} onChange={handleUserChange} required />
        </div>
        <div>
          <label htmlFor="editUserName">Nouveau nom :</label>
          <input type="text" id="editUserName" name="name" value={userData.name} onChange={handleUserChange} required />
        </div>
        <div>
          <label htmlFor="editUserEmail">Nouvel email :</label>
          <input type="email" id="editUserEmail" name="email" value={userData.email} onChange={handleUserChange} required />
        </div>
        <div>
          <label htmlFor="editUserPassword">Nouveau mot de passe :</label>
          <input type="password" id="editUserPassword" name="password" value={userData.password} onChange={handleUserChange} required />
        </div>
        <button type="submit">Modifier</button>
      </form>

      {/* Formulaire de suppression d'utilisateur */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/users/${userData.id}`, { id: userData.id })}>
        <h2>Supprimer un utilisateur</h2>
        <div>
          <label htmlFor="deleteUserId">ID de l'utilisateur :</label>
          <input type="text" id="deleteUserId" name="id" value={userData.id} onChange={handleUserChange} required />
        </div>
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire de création de catway */}
      <form onSubmit={(e) => handleSubmit(e, 'http://localhost:3001/catways', catwayData)}>
        <h2>Créer un catway</h2>
        <div>
          <label htmlFor="catwayNumber">Catway numéro :</label>
          <input type="text" id="catwayNumber" name="catwayNumber" value={catwayData.catwayNumber} onChange={handleCatwayChange} required />
        </div>
        <div>
          <label htmlFor="catwayType">Type :</label>
          <input type="text" id="catwayType" name="type" value={catwayData.type} onChange={handleCatwayChange} required />
        </div>
        <div>
          <label htmlFor="catwayState">Etat :</label>
          <input type="text" id="catwayState" name="catwayState" value={catwayData.catwayState} onChange={handleCatwayChange} required />
        </div>
        <button type="submit">Créer</button>
      </form>

      {/* Formulaire de modification de catway */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${catwayData.id}`, catwayData)}>
        <h2>Modifier un catway</h2>
        <div>
          <label htmlFor="editCatwayId">ID du catway :</label>
          <input type="text" id="editCatwayId" name="id" value={catwayData.id} onChange={handleCatwayChange} required />
        </div>
        <div>
          <label htmlFor="newType">Nouveau type :</label>
          <input type="text" id="newType" name="type" value={catwayData.type} onChange={handleCatwayChange} required />
        </div>
        <div>
          <label htmlFor="newState">Nouvel état :</label>
          <input type="text" id="newState" name="catwayState" value={catwayData.catwayState} onChange={handleCatwayChange} required />
        </div>
        <button type="submit">Modifier</button>
      </form>

      {/* Formulaire de suppression de catway */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${catwayData.id}`, { id: catwayData.id })}>
        <h2>Supprimer un catway</h2>
        <div>
          <label htmlFor="deleteCatwayId">ID du catway :</label>
          <input type="text" id="deleteCatwayId" name="id" value={catwayData.id} onChange={handleCatwayChange} required />
        </div>
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire d'affichage des détails de catway */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${catwayData.id}`, { id: catwayData.id })}>
        <h2>Afficher les détails d'un catway</h2>
        <div>
          <label htmlFor="detailCatwayId">ID du catway :</label>
          <input type="text" id="detailCatwayId" name="id" value={catwayData.id} onChange={handleCatwayChange} required />
        </div>
        <button type="submit">Afficher</button>
      </form>

      {/* Formulaire d'enregistrement d'une réservation */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${reservationData.catwayNumber}/reservations`, reservationData)}>
        <h2>Enregistrer une réservation</h2>
        <div>
          <label htmlFor="reservationCatwayNumber">Catway numéro :</label>
          <input type="text" id="reservationCatwayNumber" name="catwayNumber" value={reservationData.catwayNumber} onChange={handleReservationChange} required />
        </div>
        <div>
          <label htmlFor="reservationClientName">Nom du client :</label>
          <input type="text" id="reservationClientName" name="clientName" value={reservationData.clientName} onChange={handleReservationChange} required />
        </div>
        <div>
          <label htmlFor="reservationBoatName">Nom du bateau :</label>
          <input type="text" id="reservationBoatName" name="boatName" value={reservationData.boatName} onChange={handleReservationChange} required />
        </div>
        <div>
          <label htmlFor="reservationCheckIn">Du :</label>
          <input type="text" placeholder="Format dd/mm/aaaa" id="reservationCheckIn" name="checkIn" value={reservationData.checkIn} onChange={handleReservationChange} required />
        </div>
        <div>
          <label htmlFor="reservationCheckOut">Au :</label>
          <input type="text" placeholder="Format dd/mm/aaaa" id="reservationCheckOut" name="checkOut" value={reservationData.checkOut} onChange={handleReservationChange} required />
        </div>
        <button type="submit">Enregistrer</button>
      </form>

      {/* Formulaire de suppression de réservation */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${reservationData.catwayNumber}/reservations/${reservationData.reservationId}`, { reservationId: reservationData.reservationId })}>
        <h2>Supprimer une réservation</h2>
        <div>
          <label htmlFor="deleteReservationId">ID de la réservation :</label>
          <input type="text" id="deleteReservationId" name="reservationId" value={reservationData.reservationId} onChange={handleReservationChange} required />
        </div>
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire d'affichage des détails de réservation */}
      <form onSubmit={(e) => handleSubmit(e, `http://localhost:3001/catways/${reservationData.catwayNumber}/reservations/${reservationData.reservationId}`, { reservationId: reservationData.reservationId })}>
        <h2>Afficher les détails d'une réservation</h2>
        <div>
          <label htmlFor="reservationDetailId">ID de la réservation :</label>
          <input type="text" id="reservationDetailId" name="reservationId" value={reservationData.reservationId} onChange={handleReservationChange} required />
        </div>
        <button type="submit">Afficher</button>
      </form>

      {/* Liens pour accéder aux listes */}
      <p><a href="http://localhost:3001/catways">Accéder à la liste des catways</a></p>
      <p><a href="http://localhost:3001/reservations">Accéder à la liste des réservations</a></p>
    </div>
  );
};

export default Dashboard;
