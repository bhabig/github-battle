import React from 'react';
const Link = require('react-router-dom').Link;

const Home = () => {
  return (
    <div className="home-container">
      <h1>GitHub Battle: Battle Your Friends... and stuff</h1>
      <Link className='button' to='/battle'>
        Battle
      </Link>
    </div>
  )
}

export default Home;
