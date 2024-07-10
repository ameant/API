import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editUserFormData, setEditUserFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [deleteUserFormData, setDeleteUserFormData] = useState({ id: "" });
  const [catwayFormData, setCatwayFormData] = useState({
    id: "",
    catwayNumber: "",
    type: "",
    catwayState: "",
  });
  const [reservationFormData, setReservationFormData] = useState({
    id: "",
    catwayNumber: "",
    clientName: "",
    boatName: "",
    checkIn: "",
    checkOut: "",
  });

  const navigate = useNavigate();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      await axios.post("https://port-de-plaisance-russell.onrender.com/users/add", userFormData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert(`Création effectuée`);
    } catch (error) {
      alert("Erreur lors de la création");
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const { id } = editUserFormData;
    if (!id) return alert("ID de l'utilisateur manquant");

    try {
      await axios.put(`https://port-de-plaisance-russell.onrender.com/users/${id}`, editUserFormData);
      alert(`Modification effectuée`);
    } catch (error) {
      alert("Erreur lors de la modification");
    }
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    const { id } = deleteUserFormData;
    if (!id) return alert("ID de l'utilisateur manquant");

    try {
      const token = Cookies.get("token");
      await axios.delete(`https://port-de-plaisance-russell.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert(`Suppression effectuée`);
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleCreateCatway = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      await axios.post("https://port-de-plaisance-russell.onrender.com/catways", catwayFormData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert(`Catway créé`);
    } catch (error) {
      alert("Erreur lors de la création du catway");
    }
  };

  const handleUpdateCatway = async (event) => {
    event.preventDefault();
    const { id } = catwayFormData;
    if (!id) return alert("ID du catway manquant");

    try {
      await axios.put(`https://port-de-plaisance-russell.onrender.com/catways/${id}`, catwayFormData);
      alert(`Catway mis à jour`);
    } catch (error) {
      alert("Erreur lors de la mise à jour du catway");
    }
  };

  const handlePartialUpdateCatway = async (event) => {
    event.preventDefault();
    const { id } = catwayFormData;
    if (!id) return alert("ID du catway manquant");

    try {
      await axios.patch(`https://port-de-plaisance-russell.onrender.com/catways/${id}`, catwayFormData);
      alert(`Etat du catway mis à jour`);
    } catch (error) {
      alert("Erreur lors de la mise à jour de l'état du catway");
    }
  };

  const handleDeleteCatway = async (event) => {
    event.preventDefault();
    const { id } = catwayFormData;
    if (!id) return alert("ID du catway manquant");

    try {
      const token = Cookies.get("token");
      await axios.delete(`https://port-de-plaisance-russell.onrender.com/catways/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert(`Catway supprimé`);
    } catch (error) {
      alert("Erreur lors de la suppression du catway");
    }
  };

  const handleDetailCatway = async (event) => {
    event.preventDefault();
    const { id } = catwayFormData;
    if (!id) return alert("ID du catway manquant");

    try {
      const response = await axios.get(`https://port-de-plaisance-russell.onrender.com/catways/${id}`);
      if (response.data) {
        navigate(`/catways/${id}`);
      } else {
        alert("Aucun catway trouvé avec l'ID fourni");
      }
    } catch (error) {
      alert("Erreur lors de l'affichage des détails du catway");
    }
  };

  const handleCreateReservation = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      await axios.post(
        "https://port-de-plaisance-russell.onrender.com/reservations",
        reservationFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert(`Réservation créée`);
    } catch (error) {
      alert("Erreur lors de la création de la réservation");
    }
  };

  const handleDeleteReservation = async (event) => {
    event.preventDefault();
    const { id } = reservationFormData;
    if (!id) return alert("ID de la réservation manquant");

    try {
      const token = Cookies.get("token");
      await axios.delete(`https://port-de-plaisance-russell.onrender.com/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert(`Réservation supprimée`);
    } catch (error) {
      alert("Erreur lors de la suppression de la réservation");
    }
  };

  const handleDetailReservation = async (event) => {
    event.preventDefault();
    const { id } = reservationFormData;
    if (!id) return alert("ID de la réservation manquant");

    try {
      const response = await axios.get(
        `https://port-de-plaisance-russell.onrender.com/reservations/${id}`
      );
      if (response.data) {
        navigate(`/catways/reservations/${id}`);
      } else {
        alert("Aucune réservation trouvée avec l'ID fourni");
      }
    } catch (error) {
      alert("Erreur lors de l'affichage des détails de la réservation");
    }
  };

  return (
    <div>
      <h1>Tableau de bord</h1>

      {/* Formulaire de création d'un utilisateur */}
      <form onSubmit={handleCreateUser}>
        <h2>Créer un utilisateur</h2>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={(e) =>
            setUserFormData({ ...userFormData, password: e.target.value })
          }
        />
        <button type="submit">Créer</button>
      </form>

      {/* Formulaire de modification d'un utilisateur */}
      <form onSubmit={handleUpdateUser}>
        <h2>Modifier un utilisateur</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setEditUserFormData({ ...editUserFormData, id: e.target.value })
          }
        />
        <input
          type="text"
          name="name"
          placeholder="Nom"
          onChange={(e) =>
            setEditUserFormData({ ...editUserFormData, name: e.target.value })
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setEditUserFormData({ ...editUserFormData, email: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={(e) =>
            setEditUserFormData({
              ...editUserFormData,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Modifier</button>
      </form>

      {/* Formulaire de suppression d'un utilisateur */}
      <form onSubmit={handleDeleteUser}>
        <h2>Supprimer un utilisateur</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) => setDeleteUserFormData({ id: e.target.value })}
        />
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire de création d'un catway */}
      <form onSubmit={handleCreateCatway}>
        <h2>Créer un catway</h2>
        <input
          type="text"
          name="catwayNumber"
          placeholder="Numéro du catway"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              catwayNumber: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="type"
          placeholder="Type (court ou long)"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              type: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="catwayState"
          placeholder="disponible ou indisponible"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              catwayState: e.target.value,
            })
          }
        />
        <button type="submit">Créer</button>
      </form>

      {/* Formulaire de mise à jour d'un catway */}
      <form onSubmit={handleUpdateCatway}>
        <h2>Modifier un catway</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              id: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="catwayNumber"
          placeholder="Nouveau numéro"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              catwayNumber: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="type"
          placeholder="Nouveau type"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              type: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="catwayState"
          placeholder="Nouvel état"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              catwayState: e.target.value,
            })
          }
        />
        <button type="submit">Modifier</button>
      </form>

      {/* Formulaire de mise à jour partielle d'un catway */}
      <form onSubmit={handlePartialUpdateCatway}>
        <h2>Modifier l'état d'un catway</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              id: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="catwayState"
          placeholder="Nouvel état"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              catwayState: e.target.value,
            })
          }
        />
        <button type="submit">Modifier</button>
      </form>

      {/* Formulaire de suppression d'un catway */}
      <form onSubmit={handleDeleteCatway}>
        <h2>Supprimer un catway</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              id: e.target.value,
            })
          }
        />
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire d'affichage des détails de catway */}
      <form onSubmit={handleDetailCatway}>
        <h2>Afficher les détails d'un catway</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setCatwayFormData({
              ...catwayFormData,
              id: e.target.value,
            })
          }
        />
        <button
          type="submit"
          onClick={() => navigate(`/catways/${catwayFormData.id}`)}
        >
          Afficher
        </button>
      </form>

      {/* Formulaire de création d'une réservation */}
      <form onSubmit={handleCreateReservation}>
        <h2>Créer une réservation</h2>
        <input
          type="text"
          name="catwayNumber"
          placeholder="Numéro du catway"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              catwayNumber: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="clientName"
          placeholder="Nom du client"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              clientName: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="boatName"
          placeholder="Nom du bateau"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              boatName: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="checkIn"
          placeholder="Du"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              checkIn: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="checkOut"
          placeholder="Au"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              checkOut: e.target.value,
            })
          }
        />
        <button type="submit">Créer</button>
      </form>

      {/* Formulaire de suppression d'une réservation */}
      <form onSubmit={handleDeleteReservation}>
        <h2>Supprimer une réservation</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              id: e.target.value,
            })
          }
        />
        <button type="submit">Supprimer</button>
      </form>

      {/* Formulaire d'affichage des détails d'une réservation */}
      <form onSubmit={handleDetailReservation}>
        <h2>Afficher les détails d'une réservation</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={(e) =>
            setReservationFormData({
              ...reservationFormData,
              id: e.target.value,
            })
          }
        />
        <button
          type="submit"
          onClick={() =>
            navigate(`/reservations/${reservationFormData.id}`)
          }
        >
          Afficher
        </button>
      </form>

      {/* Liens pour accéder aux listes */}
      <p>
        <a href="https://port-de-plaisance-russell.onrender.com/catways">
          Accéder à la liste des catways
        </a>
      </p>
      <p>
        <a href="https://port-de-plaisance-russell.onrender.com/reservations">
          Accéder à la liste des réservations
        </a>
      </p>
    </div>
  );
};

export default Dashboard;
