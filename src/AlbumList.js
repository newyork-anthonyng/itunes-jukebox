import React from "react";
import PropTypes from "prop-types";

const AlbumList = ({ artistName, albums = [] }) => (
  <div>
    <h2>{artistName}</h2>
    <ul>
      {albums.map(({ id, itunesLink, albumName, albumArt }) => (
        <li key={id}>
          <a href={itunesLink} title={`See ${albumName} on iTunes`}>
            <img src={albumArt} alt={albumName} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

AlbumList.propTypes = {
  artistName: PropTypes.string,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      albumArt: PropTypes.string,
      albumName: PropTypes.string,
      itunesLink: PropTypes.string
    })
  )
};

export default AlbumList;
