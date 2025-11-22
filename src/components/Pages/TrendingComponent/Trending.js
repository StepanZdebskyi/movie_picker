import './Trending.css'
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import SingleContent from '../../SingleComponent/SingleContent';
import CustomPagination from '../../CustomPaginationComponent/CustomPagination'

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);


    const fetchTrending = async () => {

        const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            //console.log(data);

            setContent(data.results);
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending Today</span>
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
            <CustomPagination setPage={setPage} />
        </div>
    );
}

export default Trending;