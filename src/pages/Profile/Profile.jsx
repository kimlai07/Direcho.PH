import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchUserCars } from '../../services/api';
import './Profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
    };

    const getUserCars = async () => {
      const carsData = await fetchUserCars();
      setUserCars(carsData);
    };

    getUserProfile();
    getUserCars();
  }, []);

  return (
    <div className="profile-container">
      {userProfile && (
        <div className="profile-info">
          <h1>{userProfile.name}</h1>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
        </div>
      )}
      <div className="user-cars">
        <h2>Your Listed Cars</h2>
        {userCars.length > 0 ? (
          userCars.map(car => (
            <div key={car.id} className="car-card">
              <h3>{car.make} {car.model}</h3>
              <p>Price: ${car.price}</p>
              <p>Status: {car.sold ? 'Sold' : 'Available'}</p>
            </div>
          ))
        ) : (
          <p>No cars listed.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;