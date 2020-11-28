import React from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const UserTodos = ({ user, todos, clickAdd, clickTodo }) => {
  return (
    <div className="px-3 py-4">
      <h2 className="text-left mb-3">
        {user.name}
        <Button className="ml-3 px-2 py-1" onClick={() => clickAdd(user)}>
          <Plus size={25} />
        </Button>
      </h2>
      <ListGroup>
        {todos.map((todo, id) => {
          return (
            <ListGroup.Item
              action
              className="text-left"
              key={id}
              onClick={() => clickTodo(todo)}
            >
              {todo.title}
              {todo.completed && (
                <Badge className="badge-pill badge-success ml-2">
                  Completed
                </Badge>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default UserTodos;
