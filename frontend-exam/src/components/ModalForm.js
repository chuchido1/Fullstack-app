import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ModalForm = (props) => {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const handleSave = (buttonPresed) => {
    const name = nameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    props.handleClose(
      {
        id: props.user.id,
        name: name,
        lastName: lastName,
        email: email,
      },
      buttonPresed
    );
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => handleSave("Cancel")}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.formAction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name."
                defaultValue={props.user.name}
                ref={nameRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name."
                defaultValue={props.user.lastName}
                ref={lastNameRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email."
                defaultValue={props.user.email}
                ref={emailRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleSave("Cancel")}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSave("Save")}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
