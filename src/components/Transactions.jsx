import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../Store/profileSlice";
import "../styles/Transactions.css";
import { updateUserProfile } from "../Store/updateSlice";

function Transactions() {
  // récupérer le nom de l'utilisateur pour l'afficher
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user?.token);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  // afficher au click le formulaire d'édition du nom de l'utilisateur
  const [editName, setEditName] = useState(false);

  const handleEditClick = () => {
    setEditName(true);
  };

  const handleCancelClick = () => {
    setEditName(false);
  };

  // modification de user name
  const [updateUsername, setUpdateUsername] = useState(
    profile ? profile.userName : ""
  );

  useEffect(() => {
    if (profile) {
      setUpdateUsername(profile.userName);
    }
  }, [profile]);

  const handleUsernameChange = (e) => {
    setUpdateUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({ token, userName: updateUsername }));
    setEditName(false);
  };

  return (
    <div className="main bg-dark">
      {!editName ? (
        <div className="header">
          <h1>
            {" "}
            Welcome back,
            <br />{" "}
            {profile ? `${profile.firstName} ${profile.lastName}` : "Guest"} !
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
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
}

export default Transactions;
