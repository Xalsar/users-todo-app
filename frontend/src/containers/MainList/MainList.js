import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserTodos from "../../components/UserTodos/UserTodos";
import AddTask from "../../components/AddTask/AddTask";
import axios from "axios";

const MainList = () => {
  const [newTodo, setNewTodo] = useState("INITIAL");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  useEffect(() => {
    if (!newTodo && newTodo !== "INITIAL") {
      return;
    }

    axios
      .get("/api/users/")
      .then(({ data }) => {
        setNewTodo(false);
        setUsers(data);
      })
      .catch((e) => console.log(e));
  }, [newTodo]);

  return (
    <Fragment>
      <AddTask
        show={show}
        onClose={handleClose}
        onSucceed={() => setNewTodo(true)}
        userId={userId}
      />
      <Container>
        <Row className="justify-content-md-center">
          {users.map((user, id) => {
            return (
              <Col md={6} key={id}>
                <UserTodos
                  user={user}
                  todos={user.todos}
                  clickAdd={handleShow}
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
