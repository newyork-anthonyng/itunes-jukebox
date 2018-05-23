import axios from "axios";

const constructAlbumUrl = artistName => {
    // https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW2
    return `https://itunes.apple.com/search?term=${artistName.split(" ").join("+")}&entity=album`;
}

const getAlbumsForArtist = artistName => {
    return axios.get(constructAlbumUrl(artistName));
};

const formatAlbumsInfo = axiosResponse => {
    return {
        albums: axiosResponse.data.results.map(formatAlbumInfo)
    };
};

const formatAlbumInfo = ({ collectionId, collectionName, artistName, artworkUrl100, collectionViewUrl }) => ({
    id: collectionId,
    artistName,
    albumArt: artworkUrl100,
    albumName: collectionName,
    itunesLink: collectionViewUrl
});

export {
    getAlbumsForArtist,
    formatAlbumsInfo
};