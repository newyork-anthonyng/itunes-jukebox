import { getAlbumsForArtist, formatAlbumsInfo } from "./getItunesInfo";
jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve())
  };
});
import axios from "axios";

describe("getAlbumsForArtist", () => {
  it("should call correct API", () => {
    const result = getAlbumsForArtist("Michael Jackson");

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get.mock.calls[0][0]).toEqual(
      "https://itunes.apple.com/search?term=Michael+Jackson&entity=album"
    );
    // expect getAlbumsForArtist to return a Promise
    expect(typeof result.then).toEqual("function");
  });
});

describe("formatAlbumsInfo", () => {
  it("should format axios response from iTunes correctly", () => {
    const mockAxiosResponse = {
      data: {
        resultCount: 34,
        results: [
          {
            wrapperType: "collection",
            collectionType: "Album",
            artistId: 32940,
            collectionId: 159292399,
            amgArtistId: 4576,
            artistName: "Michael Jackson",
            collectionName: "The Essential Michael Jackson",
            collectionCensoredName: "The Essential Michael Jackson",
            artistViewUrl:
              "https://itunes.apple.com/us/artist/michael-jackson/32940?uo=4",
            collectionViewUrl:
              "https://itunes.apple.com/us/album/the-essential-michael-jackson/159292399?uo=4",
            artworkUrl60:
              "https://is2-ssl.mzstatic.com/image/thumb/Music127/v4/8a/65/be/8a65bef2-f23d-e43d-9124-f5e4293513f7/source/60x60bb.jpg",
            artworkUrl100:
              "https://is2-ssl.mzstatic.com/image/thumb/Music127/v4/8a/65/be/8a65bef2-f23d-e43d-9124-f5e4293513f7/source/100x100bb.jpg",
            collectionPrice: 16.99,
            collectionExplicitness: "notExplicit",
            trackCount: 38,
            copyright:
              "℗ 1972 Motown Records, a Division of UMG Recordings, Inc., 1976, 1978, 1980 Sony Music Entertainment, 1979, 1982, 1987, 1991, 1995, 2001, 2005 MJJ Productions Inc.",
            country: "USA",
            currency: "USD",
            releaseDate: "2005-07-05T07:00:00Z",
            primaryGenreName: "Pop"
          }
        ]
      }
    };
    expect(formatAlbumsInfo(mockAxiosResponse)).toMatchSnapshot();
  });
});
