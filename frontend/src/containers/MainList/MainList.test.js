import React from "react";
import MainList from "./MainList";
import UserTodos from "../../components/UserTodos/UserTodos";

import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-dom/test-utils";

const users = [
  {
    id: 1,
    todos: [],
    name: "Maximo",
    email: "maximo@upteimpulsa.com",
    active: true,
  },
  {
    id: 2,
    todos: [],
    name: "Eric",
    email: "eric@upteimpulsa.com",
    active: true,
  },
  {
    id: 3,
    todos: [
      {
        id: 1,
        title: "Decorate the office for xmas",
        description: "And here is my description",
        completed: false,
        start_time: "2020-11-26T18:46:34Z",
        end_time: null,
        user: 3,
      },
    ],
    name: "Xavi",
    email: "xavi@upteimpulsa.com",
    active: true,
  },
];

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

describe("<MainList/>", () => {
  it("should render 3 users", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/api/users/").reply(200, users);
    const wrapper = mount(<MainList />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(UserTodos)).toHaveLength(3);
  });
});
