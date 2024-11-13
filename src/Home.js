import React from 'react';
import backgroundImage from './images/Citizens.jpg';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontFamily: 'Arial, sans-serif'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px'
  };

  const subheadingStyle = {
    fontSize: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to Ubudehe Smart System</h2>
      <p style={subheadingStyle}>Ubudehe is a Rwandan practice and cultural value of 
      mutual assistance among people living in the same area in order to overcome or 
      solve their socio-economic problems. In the past, Ubudehe focused on 
      agricultural activities to ensure timely agricultural operations for food 
      security purposes.</p>
    </div>
  );
}

export default Home;
