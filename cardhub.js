import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CardHub.css';

const CardHub = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract FCC ID from location state
  const fccId = location.state?.fccId;

  // Fetch skills based on FCC ID
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-student-skills/${fccId}`);
        const data = await response.json();

        if (response.ok) {
          setSkills(data);
          setError('');
        } else {
          setSkills([]);
          setError(data.error || 'Failed to fetch skills');
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('An error occurred while fetching skills');
      }
    };

    if (fccId) fetchSkills();
  }, [fccId]);

  const renderCards = () =>
    skills.map(({ skill_topic, skill_level }) => {
      // Determine label background color based on skill_level
      let labelStyle = {};
      switch (skill_level.toUpperCase()) {
        case 'DONE':
          labelStyle = { backgroundColor: 'green' };
          break;
        case 'EXPERT':
          labelStyle = { backgroundColor: 'red' };
          break;
        default:
          labelStyle = { backgroundColor: 'gray' }; // Default for other levels
          break;
      }
  
      return (
        <div key={skill_topic} className="card">
          <h2>{skill_topic}</h2>
          <p>Skill Level: {skill_level}</p>
          <span className="label" style={labelStyle}>{skill_level.toUpperCase()}</span>
        </div>
      );
    });
  
//   // Render cards based on skills
//   const renderCards = () =>
//     skills.map(({ skill_topic, skill_level }) => (
//       <div key={skill_topic} className="card">
//         <h2>{skill_topic}</h2>
//         <p>Skill Level: {skill_level}</p>
//         <span className="label">{skill_level.toUpperCase()}</span>
//       </div>
//     ));

  return (
    <div className="container">
      <h1>Card Hub</h1>
      {error && <p className="error">{error}</p>}
      <div className="card-list">
        {skills.length > 0 ? renderCards() : <p>No skills available to display cards.</p>}
      </div>
      <button onClick={() => navigate('/student-profile')} className="back-button">
        Back to Profile
      </button>
    </div>
  );
};

export default CardHub;
