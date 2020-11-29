import React from "react";
import TaskDetails from "./TaskDetails";
import { Form } from "react-bootstrap";

import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

const task = {
  title: "I am a title!",
  description: "I am a description",
  completed: true,
};

describe("<TaskDetails/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TaskDetails
        task={task}
        show={true}
        onClose={() => {}}
        onSucceed={() => {}}
      />
    );
  });

  it(`should title input value be "${task.title}"`, () => {
    expect(wrapper.find(Form.Control).at(0).prop("value")).toBe(task.title);
  });

  it(`should description input value be "${task.description}"`, () => {
    expect(wrapper.find(Form.Control).at(1).prop("value")).toBe(
      task.description
    );
  });

  it(`should completed input value be "${task.completed}"`, () => {
    expect(wrapper.find(Form.Check).prop("checked")).toBe(task.completed);
  });
});
