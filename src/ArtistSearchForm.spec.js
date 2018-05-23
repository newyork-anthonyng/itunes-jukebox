import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import ArtistSearchForm from "./ArtistSearchForm";

const defaultProps = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  value: "Michael Jackson"
};

it("should render correctly", () => {
  const wrapper = shallow(<ArtistSearchForm {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should call correct function when submitting form", () => {
  const cb = jest.fn();
  const wrapper = mount(<ArtistSearchForm {...defaultProps} onSubmit={cb} />);

  const button = wrapper.find("button");
  // https://github.com/airbnb/enzyme/issues/308#issuecomment-291604063
  button.simulate("submit");

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should call correct function when changing input", () => {
  const cb = jest.fn();
  const wrapper = shallow(<ArtistSearchForm {...defaultProps} onChange={cb} />);

  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "Michael " } });

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0]).toMatchSnapshot();
});
