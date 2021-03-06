import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const FORM_STATES = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  VALIDATED: "VALIDATED",
};

const AddTask = ({ show, onClose, user, onSucceed }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formSatate, setFormState] = useState(FORM_STATES.INITIAL);

  useEffect(() => {
    setTitle("");
    setDescription("");
    setFormState(FORM_STATES.INITIAL);
  }, [user]);

  const saveTask = () => {
    axios
      .post("/api/users/", {
        title,
        description,
        userId: user.id,
      })
      .then(() => {
        onSucceed();
        onClose();
      })
      .catch((e) => console.log(e));
    setFormState(FORM_STATES.LOADING);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={formSatate === FORM_STATES.VALIDATED}>
          <Form.Group controlId="addTask.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              disabled={formSatate === FORM_STATES.LOADING}
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
              disabled={formSatate === FORM_STATES.LOADING}
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
        {formSatate === FORM_STATES.LOADING ? (
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
              setFormState(FORM_STATES.VALIDATED);
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
