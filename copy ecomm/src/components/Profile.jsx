import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Fetching the stored values from localStorage initially
  const [name, setName] = useState(localStorage.getItem('username') || 'Admin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');
  
  // Validation error state
  const [error, setError] = useState('');

  // Handle Save Button
  const handleSave = () => {
    // Basic validation
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Save the profile
    localStorage.setItem('username', name);
    if (password) {
      localStorage.setItem('password', password); // Storing the password (you might want to hash this before storing it in real applications)
    }
    localStorage.setItem('profilePic', profilePic);

    alert('Profile updated!');
    navigate('/'); // Navigate to the home page after saving
  };

  // Handle Cancel Button
  const handleCancel = () => {
    // Reset to saved values in localStorage
    setName(localStorage.getItem('username') || 'Admin');
    setProfilePic(localStorage.getItem('profilePic') || '');
    setPassword('');
    setConfirmPassword('');
    setError(''); // Reset error state

    navigate('/'); // Navigate to the home page when canceling
  };

  return (
    <div className="profile-container">
      <h2>Profile Management</h2>

      {/* Error message display */}
      {error && <p className="error">{error}</p>}

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Old Password"
      />

      <input 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Enter New Password"
      />
      
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm New Password"
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Profile;
