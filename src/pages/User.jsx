import React from 'react';
import Header from '../components/Header';
import Transactions from '../components/Transactions';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

function User() {
  return (
    <div>
      <Helmet>
        <title>ArgentBank - User</title>
      </Helmet>
      <Header />
      <Transactions />
      <Footer />
    </div>
  );
}

export default User;