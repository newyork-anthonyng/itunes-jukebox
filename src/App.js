import React, { Component } from "react";
import "./App.css";
import ArtistSearchForm from "./ArtistSearchForm";
import AlbumList from "./AlbumList";
import { getAlbumsForArtist, formatAlbumsInfo } from "./getItunesInfo";

// TODO: Add styling

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      albums: [],
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
          albums: (result && result.albums) || [],
          isLoading: false
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
    const { textInput, albums, isLoading, error } = this.state;

    return (
      <div>
        {error && this.renderError()}
        <ArtistSearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          value={textInput}
        />

        {isLoading && <span>🐾</span>}

        {albums.length > 0 && (
          <AlbumList artistName={albums[0].artistName} albums={albums} />
        )}
      </div>
    );
  }
}

export default App;
