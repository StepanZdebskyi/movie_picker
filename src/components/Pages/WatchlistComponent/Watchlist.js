import './Watchlist.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import SingleContent from '../../SingleComponent/SingleContent';
import CustomPagination from '../../CustomPaginationComponent/CustomPagination';

const Watchlist = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchWatchlist = async () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };

    console.log(watchlist);

    try {
      const fetches = watchlist.map(async ({ id, media_type }) => {
        if (media_type !== undefined) {
          const url = `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`;
          const response = await fetch(url, options);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          return { ...data, media_type }; // додаємо media_type до об'єкта
        }
        return null; // щоб Promise.all не ламався
      });

      const results = await Promise.all(fetches);
      const filteredResults = results.filter(Boolean); // прибираємо null
      console.log(filteredResults);
      setContent(filteredResults);
    } catch (error) {
      console.error('Error fetching watchlist items:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const syncWatchlist = async () => {
      try {
        fetchWatchlist(); // оновлює локальний state із localStorage
      } catch (error) {
        console.error('Failed to fetch watchlist from S3:', error);
        fetchWatchlist(); // fallback на localStorage
      }
    };

    syncWatchlist();

    const handler = () => syncWatchlist(); // оновлення з AWS при події
    window.addEventListener('watchlistUpdated', handler);

    return () => {
      window.removeEventListener('watchlistUpdated', handler);
    };
  }, [page]);

  return (
    <div>
      <span className="pageTitle">
        {content.length === 0 ? 'Your watchlist is empty' : 'Your watchlist'}
      </span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
