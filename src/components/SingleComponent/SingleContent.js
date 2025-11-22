import { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const [inWatchlist, setInWatchlist] = useState(false);

  const checkWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isInList = watchlist.some(
      (item) => item.id === id && item.media_type === media_type
    );
    setInWatchlist(isInList);
  };

  useEffect(() => {
    checkWatchlist();

    const handler = () => {
      checkWatchlist();
    };

    window.addEventListener("watchlistUpdated", handler);

    return () => window.removeEventListener("watchlistUpdated", handler);
  }, [id, media_type]);

  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={inWatchlist ? "In Watchlist" : 0}
        color="success"
        invisible={!inWatchlist}
        sx={{ mr: 8 }}
      />
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;