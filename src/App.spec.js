import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import App from "./App";
import ArtistSearchForm from "./ArtistSearchForm";
import { getAlbumsForArtist, formatAlbumsInfo } from "./getItunesInfo";
jest.mock("./getItunesInfo", () => ({
  getAlbumsForArtist: jest.fn(() =>
    Promise.resolve({
      albums: []
    })
  ),
  formatAlbumsInfo: jest.fn()
}));

beforeEach(() => {
  getAlbumsForArtist.mockClear();
});

it("should render correctly", () => {
  const wrapper = shallow(<App />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly with albums", () => {
  const wrapper = shallow(<App />);
  wrapper.setState({
    albums: [
      {
        albumArt:
          "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/fb/af/59/fbaf5908-0839-abc6-9f6a-bc7cc5b84f27/source/100x100bb.jpg",
        albumName: "American Beauty / American Psycho",
        artistName: "Fall Out Boy",
        id: 948754194,
        itunesLink:
          "https://itunes.apple.com/us/album/american-beauty-american-psycho/948754194?uo=4"
      }
    ]
  });

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when there is an error", () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ error: "Uh oh. Something went wrong" });

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should should update correctly when updating input", () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ error: "Uh oh" });
  const searchForm = wrapper.find(ArtistSearchForm);

  searchForm.props().onChange({ target: { value: "Michael" } });

  wrapper.update();

  expect(wrapper.find(ArtistSearchForm).props().value).toEqual("Michael");
  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe("Submitting form", () => {
  it("should call API response when submitting form", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ textInput: "Michael Jackson" });

    const searchForm = wrapper.find(ArtistSearchForm);
    const mockEvent = { preventDefault: jest.fn() };
    searchForm.props().onSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(getAlbumsForArtist).toHaveBeenCalledTimes(1);
    expect(getAlbumsForArtist.mock.calls[0]).toMatchSnapshot();
  });

  it("should update correctly when receiving correct API response", () => {
    let apiPromise;
    formatAlbumsInfo.mockImplementation(() => ({
      albums: [
        {
          albumArt:
            "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/fb/af/59/fbaf5908-0839-abc6-9f6a-bc7cc5b84f27/source/100x100bb.jpg",
          albumName: "American Beauty / American Psycho",
          artistName: "Fall Out Boy",
          id: 948754194,
          itunesLink:
            "https://itunes.apple.com/us/album/american-beauty-american-psycho/948754194?uo=4"
        }
      ]
    }));
    getAlbumsForArtist.mockImplementation(() => {
      apiPromise = Promise.resolve({});
      return apiPromise;
    });
    const wrapper = shallow(<App />);
    wrapper.setState({ textInput: "Michael Jackson" });

    const searchForm = wrapper.find(ArtistSearchForm);
    const mockEvent = { preventDefault: jest.fn() };
    searchForm.props().onSubmit(mockEvent);

    return apiPromise.then(() => {
      wrapper.update();

      expect(toJSON(wrapper)).toMatchSnapshot();
      expect(wrapper.state()).toMatchSnapshot();
    });
  });

  it("should update correctly when there is an error from API response", () => {
    let apiPromise;
    getAlbumsForArtist.mockImplementation(() => {
      apiPromise = Promise.reject("Something bad happened");
      return apiPromise;
    });
    const wrapper = shallow(<App />);
    wrapper.setState({ textInput: "Michael Jackson" });

    const searchForm = wrapper.find(ArtistSearchForm);
    const mockEvent = { preventDefault: jest.fn() };
    searchForm.props().onSubmit(mockEvent);

    return apiPromise.then().catch(() => {
      wrapper.update();

      expect(toJSON(wrapper)).toMatchSnapshot();
      expect(wrapper.state()).toMatchSnapshot();
    });
  });

  it("should update correctly when submitting form and App is loading", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ textInput: "Michael Jackson", isLoading: true });

    const searchForm = wrapper.find(ArtistSearchForm);
    const mockEvent = { preventDefault: jest.fn() };
    searchForm.props().onSubmit(mockEvent);

    expect(getAlbumsForArtist).not.toHaveBeenCalled();
  });

  it("should update correctly when submitting form and App text is empty", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ textInput: " " });

    const searchForm = wrapper.find(ArtistSearchForm);
    const mockEvent = { preventDefault: jest.fn() };
    searchForm.props().onSubmit(mockEvent);

    expect(getAlbumsForArtist).not.toHaveBeenCalled();
  });
});
