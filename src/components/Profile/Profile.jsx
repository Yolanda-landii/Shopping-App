import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({
    ...user,
    profilePicture: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        profilePicture: null,
      });
    }
  }, [user]);

  const handleProfilePictureChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...formData,
      profilePicture: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : user.profilePicture,
    };

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Profile update failed');
    }
  };

  return (
    <form onSubmit={handleSaveProfile}>
      <img src={user.profilePicture} alt="Profile" />
      <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="text" name="surname" value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} />
      <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="file" name="profilePicture" onChange={handleProfilePictureChange} />
      <button type="submit">Save Profile</button>
    </form>
  );
};


