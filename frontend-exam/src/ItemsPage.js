import { React, useState, useRef, useEffect } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import { getItems, addItem, editItem, deleteItem as delItem } from "./itemsapi";
import "./ItemsPage.css";

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [formAction, setFormAction] = useState(0);

  const userIdRef = useRef();
  const quantityRef = useRef();
  const itemRef = useRef();
  const descriptionRef = useRef();

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const postItem = async (item) => {
    try {
      const response = await addItem(item);
      setItems(response.data);
    } catch (err) {}
  };

  const putItem = async (item) => {
    try {
      const response = await editItem(item);
      setItems((prevItems) => {
        return prevItems
          .map((e) => (e.id === item.id ? item : e))
          .sort((a, b) => a.id - b.id);
      });
    } catch (err) {}
  };

  const deleteItem = async (id) => {
    try {
      const response = await delItem(id);
      setItems(response.data);
    } catch (err) {}
  };

  const handleAddItem = () => {
    setFormAction(1);
    setShowAddEdit(true);
    setCurrentItem({
      id: -1,
      userId: "",
      itemName: "",
      description: "",
      quantity: 0,
    });
  };

  const handleOpenEdit = (id) => {
    setShowAddEdit(true);
    setFormAction(2);
    setCurrentItem(items.find((item) => item.id === id));
    console.log(items);
  };
  const handleAddEdit = () => {
    let itemId = currentItem.id;
    const userId =
      formAction === 1 ? userIdRef.current.value : currentItem.userId;
    const quantity = quantityRef.current.value;
    const item = itemRef.current.value;
    const description = descriptionRef.current.value;

    console.log(item);

    const itemToSave = {
      id: itemId,
      userId: userId,
      itemName: item,
      description: description,
      quantity: quantity,
    };

    if (formAction === 1) {
      //Add item
      postItem(itemToSave);
    } else {
      //Edit item
      putItem(itemToSave);
    }

    setShowAddEdit(false);
  };

  const handleOpenDelete = (id) => {
    setShowDelete(true);
    setCurrentItem(items.find((item) => item.id === id));
  };
  const handleDelete = () => {
    deleteItem(currentItem.id);
    setShowDelete(false);
  };

  return (
    <>
      <h1 id="items-title">Items</h1>

      <Modal
        show={showAddEdit}
        onHide={() => setShowAddEdit(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formAction === 1 ? "Add new item" : "Edit item"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {formAction === 1 && (
              <Form.Group className="mb-3" controlId="formGroupUserId">
                <Form.Label>User ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the ID of the user it belongs to."
                  defaultValue={currentItem.userId}
                  ref={userIdRef}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formGroupQuantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Enter the quantity of this item."
                defaultValue={
                  currentItem.quantity < 1 ? 1 : currentItem.quantity
                }
                ref={quantityRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupItem">
              <Form.Label>Item:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the item."
                defaultValue={currentItem.itemName}
                ref={itemRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the description of the item."
                defaultValue={currentItem.description}
                ref={descriptionRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="add-item">
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    className="edit-delete-button"
                    onClick={() => handleOpenEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="warning"
                    className="edit-delete-button"
                    onClick={() => handleOpenDelete(item.id)}
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

export default ItemsPage;
