import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./UsersPage.css";
import ModalForm from "./components/ModalForm";
import { Modal } from "react-bootstrap";
import { getUsers, addUser, editUser, deleteUser as delUser } from "./usersapi";

const UsersPage = () => {
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: "Jesus",
  //     lastName: "Arriaga",
  //     email: "chuchido1@hotmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Juan",
  //     lastName: "Perez",
  //     email: "juanp@gmail.com",
  //   },
  // ]);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const postUser = async (user) => {
    try {
      const response = await addUser(user);
      setUsers(response.data);
    } catch (err) {}
  };

  const putUser = async (user) => {
    try {
      const response = await editUser(user);
      setUsers((prevUsers) => {
        return prevUsers
          .map((e) => (e.id === user.id ? user : e))
          .sort((a, b) => a.id - b.id);
      });
    } catch (err) {}
  };

  const deleteUser = async (id) => {
    try {
      const response = await delUser(id);
      setUsers(response.data);
    } catch (err) {}
  };

  const [showDelete, setShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

  const [editedUser, setEditedUser] = useState({});

  const [show, setShow] = useState(false);
  const [formAction, setFormAction] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
  });

  const handleClose = (userToSave, buttonPressed) => {
    if (buttonPressed === "Save") {
      if (userToSave.id !== -1) {
        putUser(userToSave);
      } else {
        // useEffect(() => {
        //   postUser(userToSave);
        // }, []);
        postUser(userToSave);
      }
    }
    setShow(false);
  };

  const handleEdit = (id) => {
    setFormAction("Edit user");
    setEditedUser(users.find((user) => user.id === id));
    setShow(true);
  };

  const handleDelete = (id) => {
    setShowDelete(false);
    deleteUser(id);
  };

  const handleDeleteOpen = (id) => {
    setShowDelete(true);
    setUserToDelete(users.find((user) => user.id === id));
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleAddUser = () => {
    setFormAction("Add new user");
    setEditedUser({ id: -1, name: "", lastName: "", email: "" });
    setShow(true);

    // const userAction = async () => {
    //   const response = await fetch(
    //     "https://localhost:7052/api/Character/GetCharacterById/1"
    //   );
    //   const myJson = await response.json(); //extract JSON from the http response
    //   console.log("My name is: " + myJson.name);
    // };
    // userAction();
  };

  return (
    <>
      <h1 id="users-title">Users</h1>
      <ModalForm
        show={show}
        handleClose={handleClose}
        user={editedUser}
        formAction={formAction}
      ></ModalForm>
      <Modal show={showDelete} onHide={handleDeleteClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(userToDelete.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="add-user">
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    className="edit-delete-button"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="warning"
                    className="edit-delete-button"
                    onClick={() => handleDeleteOpen(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersPage;
