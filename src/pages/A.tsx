import React from 'react';
import '../styles/A.css';

const A: React.FC = () => {
  return (
    <div className="a-container">
      <header className="a-header">
        <h1>Welcome to LendCo Home Page</h1>
        <p>Your gateway to smooth document management</p>
      </header>

      <section className="a-features">
        <div className="feature-card">
          <h3>Fast Access</h3>
          <p>Quickly find and manage your documents with ease.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Storage</h3>
          <p>Your data is safe with our top-notch security protocols.</p>
        </div>
        <div className="feature-card">
          <h3>User Friendly</h3>
          <p>Intuitive design for seamless user experience.</p>
        </div>
      </section>
    </div>
  );
};

export default A;
