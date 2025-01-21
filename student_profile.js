// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './StudentProfile.css';

// const StudentProfile = () => {
//   const [fccId, setFccId] = useState('');
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Load saved profile from localStorage on component mount
//   useEffect(() => {
//     const savedProfile = JSON.parse(localStorage.getItem('studentProfile'));
//     if (savedProfile) {
//       setStudent(savedProfile);
//     }
//   }, []);

//   // Handle search functionality
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/get-student-profile/${fccId}`);
//       const data = await response.json();

//       if (response.ok) {
//         setStudent(data); // Set student data
//         setError(''); // Clear error
//         localStorage.setItem('studentProfile', JSON.stringify(data)); // Save to localStorage
//       } else {
//         setStudent(null); // Clear previous student data
//         setError(data.error || 'Student not found');
//       }
//     } catch (error) {
//       console.error('Error fetching student profile:', error);
//       setError('An error occurred while fetching student profile');
//     } finally {
//       setFccId(''); // Clear the FCC ID input
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h1>Student Profile</h1>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           value={fccId}
//           onChange={(e) => setFccId(e.target.value)}
//           placeholder="Enter FCC ID"
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           Search
//         </button>
//       </div>

//       {error && <p className="error">{error}</p>}

//       {student && (
//         <div className="profile-card">
//           <h2>Student Profile</h2>
//           <p><strong>Name:</strong> {student.name}</p>
//           <p><strong>FCC ID:</strong> {student.fcc_id}</p>
//           <p><strong>Father's Name:</strong> {student.father}</p>
//           <p><strong>Mother's Name:</strong> {student.mother}</p>
//           <p><strong>Schooling Class:</strong> {student.schooling_class}</p>
//           <p><strong>Mobile Number:</strong> {student.mobile_number}</p>
//           <p><strong>Address:</strong> {student.address}</p>
//           <p><strong>Skills:</strong> {student.skills}</p>
//           <p><strong>Tuition Fee Paid:</strong> {student.tutionfee_paid ? 'Yes' : 'No'}</p>
//           <p><strong>Admission Date:</strong> {new Date(student.admission_date).toLocaleDateString()}</p>
//           <button
//             className="card-hub-button"
//             onClick={() => navigate('/card-hub', { state: { skills: student.skills } })}
//           >
//             View Cards
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
  const [fccId, setFccId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load saved profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('studentProfile'));
    if (savedProfile) {
      setStudent(savedProfile);
    }
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-student-profile/${fccId}`);
      const data = await response.json();

      if (response.ok) {
        setStudent(data); // Set student data
        setError(''); // Clear error
        localStorage.setItem('studentProfile', JSON.stringify(data)); // Save to localStorage
      } else {
        setStudent(null); // Clear previous student data
        setError(data.error || 'Student not found');
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
      setError('An error occurred while fetching student profile');
    } finally {
      setFccId(''); // Clear the FCC ID input
    }
  };

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={fccId}
          onChange={(e) => setFccId(e.target.value)}
          placeholder="Enter FCC ID"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {student && (
        <div className="profile-card">
          <h2>Student Profile</h2>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>FCC ID:</strong> {student.fcc_id}</p>
          <p><strong>Father's Name:</strong> {student.father}</p>
          <p><strong>Mother's Name:</strong> {student.mother}</p>
          <p><strong>Schooling Class:</strong> {student.schooling_class}</p>
          <p><strong>Mobile Number:</strong> {student.mobile_number}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Tuition Fee Paid:</strong> {student.tutionfee_paid ? 'Yes' : 'No'}</p>
          <p><strong>Admission Date:</strong> {new Date(student.admission_date).toLocaleDateString()}</p>
          <button
            className="card-hub-button"
            onClick={() => navigate('/card-hub', { state: { fccId: student.fcc_id } })}
          >
            View Cards
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

