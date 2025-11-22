import React from 'react';
import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import './MainPageHeader.css';

const MainPageHeader = () => {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const user = {
    name: userName,
    avatar: '', // You can also store/retrieve avatar URL from localStorage if needed
  };

  return (
    <div className="mainPageHeader">
      {/* Main Title */}
      <span className="headerTitle">Movie Insights</span>

      {/* User Profile Section (Right Aligned) */}
      <div className="userProfile">
        <span className="userName">{user.name}</span>
        <Avatar
          alt={user.name}
          src={user.avatar}
          className="userAvatar"
          sx={{ width: 40, height: 40, bgcolor: '#f50057' }} // Custom size & color
        />
      </div>
    </div>
  );
};

export default MainPageHeader;
