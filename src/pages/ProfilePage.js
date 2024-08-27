import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser } from '../utils/localStorage';
import defaultProfilePic from '../assets/pp icon.jpg'; 
// import './Profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const result = await fetchUsers();
          const currentUser = result.data.find(u => u.id === user.id);
          if (currentUser) {
            setProfile(currentUser);
            setName(currentUser.name);
            setSurname(currentUser.surname);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
            setProfilePicture(currentUser.profilePicture || defaultProfilePic);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set Base64 string as profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!profile) {
      setError('Profile not found.');
      return;
    }
    
    try {
      const updatedProfile = {
        name,
        surname,
        email,
        phone,
        profilePicture,
      };

      console.log('Updating profile:', updatedProfile);

      const response = await updateUser(profile.id, updatedProfile);

      console.log('Update response:', response.data);

      // Optionally update localStorage
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      setError('Error updating profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="main-content">
        <header className="header">
          <div className="profile-actions">
            <div className="user-info">
              <img src={profilePicture} alt="User" className="profile-pic" onError={(e) => e.target.src = defaultProfilePic} />
              <span>{profile?.name} {profile?.surname}</span>
            </div>
            <input type="file" onChange={handleProfilePictureChange} />
          </div>
        </header>

        <main className="profile-main">
          <section className="profile-info">
            <h2>General Information</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="profile-form" onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27-345 678 910"
                />
              </div>
              <button type="submit" className="save-button">Save All</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
