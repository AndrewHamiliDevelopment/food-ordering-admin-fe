import React, { useState } from "react";
import { Modal, Button, Form, Table, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UsersManagement.css";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPermission, setUserPermission] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Kail Hamili", email: "admin@admin.com", confirmed: "Yes", roles: "Administrator", permissions: "None", created: "1 minute ago", updated: "1 minute ago" },
    { id: 2, name: "Default User", email: "guest@guest.com", confirmed: "Yes", roles: "User", permissions: "None", created: "1 minute ago", updated: "1 minute ago" },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (isEditing) {
      setUsers(
        users.map((user) =>
          user.id === editingUserId
            ? { ...user, name: userName, email: userEmail, roles: userRole, permissions: userPermission, updated: "Just now" }
            : user
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,
        name: userName,
        email: userEmail,
        confirmed: "Yes",
        roles: userRole,
        permissions: userPermission,
        created: "Just now",
        updated: "Just now",
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEditUser = (user) => {
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.roles);
    setUserPermission(user.permissions);
    setEditingUserId(user.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserRole("");
    setUserPermission("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  return (
    <Container>
      <h2 className="user-management-title">User Management</h2>
      <Row className="mb-3 d-flex justify-content-between">
        <Col xs={12} md={6} className="mb-2">
          <Button className="w-100" variant="primary" onClick={() => { setShowModal(true); resetForm(); }}>
            Add User
          </Button>
        </Col>
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            className="w-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Confirmed</th>
              <th>Roles</th>
              <th>Permissions</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.confirmed}</td>
                <td>{user.roles}</td>
                <td>{user.permissions}</td>
                <td>{user.created}</td>
                <td>{user.updated}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditUser(user)}>✏️</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>❌</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Rider">Rider</option>
                <option value="Customer">Customer</option>
              </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Other Permission</Form.Label>
              <Form.Select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="">Select Permission</option>
                <option value="Admin">Access to Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddUser}>{isEditing ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;