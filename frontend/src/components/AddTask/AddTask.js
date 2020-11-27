import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const AddTask = ({ show, onClose, userId, onSucceed }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveTask = () => {
    axios
      .post("/api/users/", {
        title,
        description,
        userId,
      })
      .then(() => {
        onSucceed();
        onClose();
        setTitle("");
        setDescription("");
        setValidated(false);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    setLoading(true);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated}>
          <Form.Group controlId="addTask.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please, provide a title
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="addTask.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please, provide a description
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {loading ? (
          <Button variant="primary" disabled={true}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              setValidated(true);
              if (title && description) {
                saveTask();
              }
            }}
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddTask;
