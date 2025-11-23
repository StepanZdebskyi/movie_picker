import React, { useEffect, useState } from 'react';
import { ThemeProvider, makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import './ContentModal.css';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '90%',
    height: '80%',
    backgroundColor: '#39445a',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    padding: '16px',
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [inWatchlist, setInWatchlist] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setContent(data);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  const toggleWatchlist = async () => {
    // 1. Get current data
    const localWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const userEmail = localStorage.getItem('userEmail'); // Get the unique ID
    const item = { id, media_type };

    let newWatchlist;

    // 2. Calculate new list
    if (inWatchlist) {
      newWatchlist = localWatchlist.filter(
        (w) => !(w.id === item.id && w.media_type === item.media_type),
      );
    } else {
      newWatchlist = [...localWatchlist, item];
    }

    // 3. Send to Server FIRST
    if (userEmail) {
      try {
        const response = await fetch('http://localhost:5000/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            watchlist: newWatchlist,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // 4. If Server succeeds, update Local Storage and State
          localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
          setInWatchlist(!inWatchlist);
          // Dispatch event so other components (like header) know to update
          window.dispatchEvent(new Event('watchlistUpdated'));
        } else {
          console.error('Server failed to update watchlist');
        }
      } catch (error) {
        console.error('Network error updating watchlist:', error);
      }
    } else {
      // Fallback for guest users (No server sync, just local storage)
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setInWatchlist(!inWatchlist);
      window.dispatchEvent(new Event('watchlistUpdated'));
    }
  };

  const fetchVideo = async () => {
    const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }

    //const { data } = await axios.get(
    //    `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    //);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isInList = watchlist.some((item) => item.id === id && item.media_type === media_type);
    setInWatchlist(isInList);
  }, []);

  return (
    <>
      <div className="media" style={{ cursor: 'pointer' }} color="inherit" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: 'transparent', // <--- прибирає фон
          },
        }}>
        {
          <Fade in={open}>
            {content && (
              <div className={classes.paper}>
                <div className="ContentModal">
                  <img
                    src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                    alt={content.name || content.title}
                    className="ContentModal__portrait"
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                  />
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content.name || content.title} (
                      {(content.first_air_date || content.release_date || '-----').substring(0, 4)})
                    </span>
                    {content.tagline && <i className="tagline">{content.tagline}</i>}

                    <span className="ContentModal__description">{content.overview}</span>

                    <div>
                      <Carousel id={id} media_type={media_type} />
                    </div>

                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}>
                      Watch the Trailer
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: inWatchlist ? '#d32f2f' : '#1976d2',
                        borderColor: inWatchlist ? '#9a0007' : '#004ba0',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: inWatchlist ? '#b71c1c' : '#115293',
                          borderColor: inWatchlist ? '#7f0000' : '#003c8f',
                        },
                        mt: 1.5,
                      }}
                      onClick={toggleWatchlist} // тут викликаємо функцію
                    >
                      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Fade>
        }
      </Modal>
    </>
  );
}
