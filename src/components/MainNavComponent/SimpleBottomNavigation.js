import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(value === 0) navigate("/");
    else if(value === 1) navigate("/movies");
    else if(value === 2) navigate("/series");
    else if(value === 3) navigate("/search");
    else if(value === 4) navigate("/watchlist");
  }, [value])

  return (
    <Box sx={{ 
      width: '100%', 
      position: 'fixed', 
      bottom: 0, 
      zIndex: 100
      }}>
      <BottomNavigation
      sx={{backgroundColor: '#2d313a'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{color: "white"}}
        label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction
         style={{color:"white"}}
         label="Movies" icon={<LocalMoviesIcon />} />
        <BottomNavigationAction
         style={{color:"white"}}
         label="Series" icon={<LiveTvIcon />} />
         <BottomNavigationAction
         style={{color:"white"}}
         label="Search" icon={<SavedSearchIcon />} />
         <BottomNavigationAction
         style={{color:"white"}}
         label="Watchlist" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  );
}