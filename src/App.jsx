import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded to look directly at your local Spring Boot REST API
  const API_URL = 'http://localhost:8080';

  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not pull data from the Java backend');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h3>Loading student roster...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: 'red' }}>
        <h3>Error: {error}</h3>
        <p>Make sure your Spring Boot application is actively running on port 8080!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #2c3e50', paddingBottom: '10px' }}>
        Coaching Management System - Student Roster
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>First Name</th>
            <th style={{ padding: '12px' }}>Last Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: '1px solid #dddddd' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{student.id}</td>
              <td style={{ padding: '12px' }}>{student.firstName}</td>
              <td style={{ padding: '12px' }}>{student.lastName}</td>
              <td style={{ padding: '12px' }}>{student.email}</td>
              <td style={{ padding: '12px' }}>{student.phone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;