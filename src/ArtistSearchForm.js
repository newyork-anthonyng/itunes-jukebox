import React from "react";
import PropTypes from "prop-types";

const ArtistSearchForm = ({ onSubmit, onChange, value }) => (
  <form onSubmit={onSubmit}>
    <label>
      Search albums for artist
      <input
        type="text"
        placeholder="Enter artist name"
        value={value}
        onChange={onChange}
      />
    </label>

    <button type="submit">Search</button>
  </form>
);

ArtistSearchForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default ArtistSearchForm;
