import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const AddTask = ({ show, onClose, userId }) => {
  console.log(userId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveTask = () => {
    axios
      .post("/api/users/", {
        title,
        description,
        userId,
      })
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="addTask.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="addTask.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveTask}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTask;
