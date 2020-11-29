import React from "react";
import UserTodos from "./UserTodos";
import { ListGroup, Badge } from "react-bootstrap";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const user = {
  name: "Maximo",
};

const todos = [
  { id: 1, title: "Lorem dolor ipsum", description: "Sit amen" },
  {
    id: 2,
    title: "Lorem dolor ipsum",
    description: "Sit amen",
    completed: true,
  },
];

describe("<UserTodos/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserTodos user={user} todos={todos} />);
  });

  it(`should contain ${todos.length} item(s)`, () => {
    expect(wrapper.find(ListGroup.Item)).toHaveLength(2);
  });

  it("should contain 1 completed item", () => {
    expect(wrapper.find(Badge)).toHaveLength(1);
  });

  it(`should contain" ${todos[0].title}" on of the items`, () => {
    expect(
      wrapper.find(ListGroup.Item).at(0).text().includes(todos[0].title)
    ).toBe(true);
  });
});
