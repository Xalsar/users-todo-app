import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserTodos from "../../components/UserTodos/UserTodos";
import AddTask from "../../components/AddTask/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import axios from "axios";

const MainList = () => {
  const [update, setUpdate] = useState("INITIAL");
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [activeTask, setActiveTask] = useState({});

  const handleAddTaskClose = () => setActiveUser({});
  const handleAddTaskShow = (user) => {
    setActiveUser(user);
  };

  const handleTaskDetailsClose = () => setActiveTask({});
  const handleTaskDetailsShow = (task) => {
    setActiveTask(task);
  };

  useEffect(() => {
    if (!update && update !== "INITIAL") {
      return;
    }

    axios
      .get("/api/users/")
      .then(({ data }) => {
        setUpdate(false);
        setUsers(data);
      })
      .catch((e) => console.log(e));
  }, [update]);

  return (
    <Fragment>
      <AddTask
        show={Object.keys(activeUser).length !== 0}
        onClose={handleAddTaskClose}
        onSucceed={() => setUpdate(true)}
        user={activeUser}
      />
      <TaskDetails
        show={Object.keys(activeTask).length !== 0}
        onClose={handleTaskDetailsClose}
        onSucceed={() => setUpdate(true)}
        task={activeTask}
      />
      <Container>
        <Row className="justify-content-md-center">
          {users.map((user, id) => {
            return (
              <Col md={6} key={id}>
                <UserTodos
                  user={user}
                  todos={user.todos}
                  clickAdd={handleAddTaskShow}
                  clickTodo={handleTaskDetailsShow}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default MainList;
