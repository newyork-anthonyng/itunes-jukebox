import React from "react";
import PropTypes from "prop-types";

const AlbumList = ({ artistName, albums = [] }) => (
    <div>
        <h2>{artistName}</h2>
        <ul>
        {albums.map(album => (
            <li key={album.id}>
            <img src={album.albumArt} alt={album.albumName} />
            </li>
        ))}
        </ul>
    </div>
);

AlbumList.propTypes = {
    artistName: PropTypes.string,
    albums: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        albumArt: PropTypes.string,
        albumName: PropTypes.string
    }))
};

export default AlbumList;