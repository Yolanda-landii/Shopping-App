import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultProfilePic from '../assets/pp icon.jpg';
import './Profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    profilePicture: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (!storedUser) {
        throw new Error('No user found in local storage');
      }

      const response = await axios.get(`http://localhost:5000/users/${storedUser.id}`);
      const currentUser = response.data;
      
      if (!currentUser) {
        throw new Error('User not found in database');
      }

      setProfile(currentUser);
      setFormData({
        name: currentUser.name || '',
        surname: currentUser.surname || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        profilePicture: null
      });
      setPreviewUrl(currentUser.profilePicture || defaultProfilePic);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrors({ general: 'Failed to load profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required';
    } else if (formData.surname.length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Image size should be less than 5MB'
        }));
        return;
      }

      if (!file.type.match('image.*')) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Please select an image file'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      
      if (!profile) {
        throw new Error('No profile data available');
      }

      const updatedProfile = {
        ...profile,
        ...formData,
        profilePicture: formData.profilePicture || profile.profilePicture
      };

      // Update profile in the database
      await axios.put(`http://localhost:5000/users/${profile.id}`, updatedProfile);
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh profile data
      await fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img 
                src={previewUrl || defaultProfilePic} 
                alt="Profile" 
                className="profile-picture"
                onError={(e) => e.target.src = defaultProfilePic}
              />
              <div className="profile-picture-overlay">
                <label htmlFor="profile-picture-input" className="change-picture-btn">
                  Change Picture
                </label>
              </div>
            </div>
            <input
              type="file"
              id="profile-picture-input"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.profilePicture && (
              <div className="error-message">
                {errors.profilePicture}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your first name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className={errors.surname ? 'error' : ''}
              placeholder="Enter your last name"
            />
            {errors.surname && <div className="error-message">{errors.surname}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <button 
            type="submit" 
            className="save-button"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
