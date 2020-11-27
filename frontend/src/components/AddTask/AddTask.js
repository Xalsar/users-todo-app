import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTask = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add new Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="addTask.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="addTask.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTask;
