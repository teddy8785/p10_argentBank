import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../Store/profileSlice";
import Account from "./Account";
import "../styles/Transactions.css";

function Transactions() {

const dispatch = useDispatch();
const token = useSelector((state) => state.user.user?.token);
const profile = useSelector((state) => state.profile.profile);

// récupération du profil utilisateur si le token est présent
useEffect(() => {
  if (token) {
    dispatch(fetchUserProfile(token));
  }
}, [dispatch, token]);

// état pour afficher le formulaire d'édition du nom de l'utilisateur
const [editName, setEditName] = useState(false);

// états pour gérer la modification du nom d'utilisateur
const [updateUsername, setUpdateUsername] = useState(profile ? profile.userName : "");
const [tempUsername, setTempUsername] = useState("");

// synchronisation de updateUsername avec le profil lorsque celui-ci est mis à jour
useEffect(() => {
  if (profile) {
    setUpdateUsername(profile.userName);
  }
}, [profile]);

// gestion des événements pour afficher et annuler l'édition du nom
const handleEditClick = () => {
  setTempUsername(updateUsername);
  setEditName(true);
};

const handleCancelClick = () => {
  setUpdateUsername(tempUsername);
  setEditName(false);
};

// gestion de la saisie de l'utilisateur
const handleUsernameChange = (e) => {
  setUpdateUsername(e.target.value);
};

// soumission de la modification de nom d'utilisateur
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(updateUserProfile({ token, userName: updateUsername }))
    .then(() => {
      setEditName(false);
      dispatch(fetchUserProfile(token));
    })
    .catch((error) => {
      console.error("Erreur dans le changement de nom !", error);
    });
};

  return (
    <div className="main bg-dark">
      {!editName ? (
        <div className="header">
          <h1>
            Welcome back,
            <br />
            {profile ? `${profile.firstName} ${profile.lastName}` : "Guest"}!
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </div>
      ) : (
        <div>
          <form className="header" onSubmit={handleSubmit}>
            <h2>Edit user info</h2>
            <div className="input-content">
              <label htmlFor="userName">User name: </label>
              <input
                className="input"
                type="text"
                id="userName"
                value={updateUsername}
                onChange={handleUsernameChange}
              ></input>
            </div>
            <div className="input-content">
              <label htmlFor="firstName">First name: </label>
              <input
                className="input"
                type="text"
                id="firstName"
                value={profile ? profile.firstName : ""}
                disabled
              ></input>
            </div>
            <div className="input-content">
              <label htmlFor="lastName">Last name: </label>
              <input
                className="input"
                type="text"
                id="lastName"
                value={profile ? profile.lastName : ""}
                disabled
              ></input>
            </div>
            <div className="button-content">
              <button className="edit-button save-button" type="submit">
                Save
              </button>
              <button
                className="edit-button cancel-button"
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

<h2 className="sr-only">Accounts</h2>
    
    <Account 
    title= "Argent Bank Checking (x8349)"
    amount= "$2,082.79"
    description= "Available Balance"
    button= "View transactions" />
     <Account 
    title= "Argent Bank Savings (x6712)"
    amount= "$10,928.42"
    description= "Available Balance"
    button= "View transactions"  />
     <Account 
    title= "Argent Bank Credit Card (x8349)"
    amount= "$184.30"
    description= "Current Balance"
    button= "View transactions"  />
    </div>
  );
}

export default Transactions;