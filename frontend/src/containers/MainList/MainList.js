import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import UserTodos from "../../components/UserTodos/UserTodos";
import axios from "axios";

const MainList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users/").then(({ data }) => setUsers(data));
  }, [axios]);

  return (
    <Fragment>
      <Container fluid="md">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            {users.map((user, id) => {
              return <UserTodos user={user} todos={user.todos} key={id} />;
            })}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MainList;
