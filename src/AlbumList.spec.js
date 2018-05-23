import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import AlbumList from "./AlbumList";

const defaultProps = {
  artistName: "Michael Jackson",
  albums: [
    {
      albumArt:
        "https://is2-ssl.mzstatic.com/image/thumb/Music127/v4/8a/65/be/8a65bef2-f23d-e43d-9124-f5e4293513f7/source/100x100bb.jpg",
      albumName: "The Essential Michael Jackson",
      artistName: "Michael Jackson",
      id: 159292399,
      itunesLink:
        "https://itunes.apple.com/us/album/the-essential-michael-jackson/159292399?uo=4"
    }
  ]
};

it("should render correctly", () => {
  const wrapper = shallow(<AlbumList {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when there are no albums", () => {
  const wrapper = shallow(<AlbumList {...defaultProps} albums={undefined} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
