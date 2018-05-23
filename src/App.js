import React, { Component } from "react";
import "./App.css";
import ArtistSearchForm from "./ArtistSearchForm";
import AlbumList from "./AlbumList";
import { getAlbumsForArtist, formatAlbumsInfo } from "./getItunesInfo";

// TODO: Have a loading state
// TODO: Add styling
// TODO: Refactor components and add unit tests

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      albums: [
        {
          albumArt:
            "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/fb/af/59/fbaf5908-0839-abc6-9f6a-bc7cc5b84f27/source/100x100bb.jpg",
          albumName: "American Beauty / American Psycho",
          artistName: "Fall Out Boy",
          id: 948754194,
          itunesLink:
            "https://itunes.apple.com/us/album/american-beauty-american-psycho/948754194?uo=4"
        },
        {
          albumArt:
            "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/c2/e6/25/c2e62579-2f93-b3a0-0bea-22658dc39ba6/source/100x100bb.jpg",
          albumName: "Save Rock and Roll",
          artistName: "Fall Out Boy",
          id: 624200155,
          itunesLink:
            "https://itunes.apple.com/us/album/save-rock-and-roll/624200155?uo=4"
        }
      ],
      loading: false,
      error: null,
      isLoading: false
    };
  }

  handleInputChange = e => {
    this.setState({
      textInput: e.target.value,
      error: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.isLoading) {
      return;
    }

    if (this.state.textInput.trim() === "") {
      return this.setState({
        error: "Please enter an artist name",
        isLoading: false
      });
    }

    this.setState({
      error: null,
      isLoading: true
    });

    return getAlbumsForArtist(this.state.textInput)
      .then(response => {
        const result = formatAlbumsInfo(response);

        this.setState({
          albums: result.albums,
          isLoading: true
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          error:
            "Whoops. An error occurred when trying to get album information.",
          isLoading: false
        });
      });
  };

  renderError = () => {
    return <h2 role="alert">{this.state.error}</h2>;
  };

  render() {
    const { textInput } = this.state;

    return (
      <div>
        {this.renderError()}
        <ArtistSearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          value={textInput}
        />

        {this.state.albums.length > 0 && (
          <AlbumList
            aritstName={this.state.albums[0].artistName}
            albums={this.state.albums}
          />
        )}
      </div>
    );
  }
}

export default App;
