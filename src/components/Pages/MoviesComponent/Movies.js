import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../GenresComponent/Genres";
import SingleContent from "../../SingleComponent/SingleContent";
import useGenreHook from "../../../Hooks/useGenreHook";
import CustomPagination from "../../CustomPaginationComponent/CustomPagination";

const Movies = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenreHook(selectedGenres);
    // console.log(selectedGenres);

    const fetchMovies = async () => {

        const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;
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
            console.log(data);

            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }

        //const { data } = await axios.get(
        //  `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        //);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    return (
        <div>
            <span className="pageTitle">Discover Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};

export default Movies;