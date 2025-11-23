import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@mui/material'; // 1. Import Button
import './MainPageHeader.css';

const MainPageHeader = () => {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    // Clear all user data
    localStorage.clear();
    window.location.href = '/login';
  };

  const user = {
    name: userName,
    avatar: '',
  };

  return (
    <div className="mainPageHeader">
      <Button
        variant="outlined"
        color="inherit"
        className="logoutBtn"
        onClick={handleLogout}
        sx={{
          marginRight: '20px',

          color: 'white',
          borderColor: 'white',
          height: '30px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#f50057',
          },
        }}>
        Logout
      </Button>

      <span className="headerTitle">Movie Insights</span>

      <div className="userProfile">
        <span className="userName">{user.name}</span>
        <Avatar
          alt={user.name}
          src={user.avatar}
          className="userAvatar"
          sx={{ width: 40, height: 40, bgcolor: '#f50057' }}
        />
      </div>
    </div>
  );
};

export default MainPageHeader;
