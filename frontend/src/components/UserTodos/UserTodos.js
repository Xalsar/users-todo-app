import React from "react";
import { Plus } from "react-bootstrap-icons";

const UserTodos = ({ user, todos }) => {
  return (
    <div className="jumbotron py-3 bg-transparent">
      <h2 className="text-left mb-3">
        {user.name}
        <button type="button" class="btn btn-primary ml-3 px-2 py-1">
          <Plus size={25} />
        </button>
      </h2>
      <ul className="list-group">
        {todos.map((todo, id) => {
          return (
            <li className="list-group-item list-group-item-action text-left">
              {todo.title}
              {todo.completed && (
                <span class="badge badge-pill badge-success ml-2">
                  Completed
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserTodos;
