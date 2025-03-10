import React, { useState } from 'react';
import "./UsersManagement.css";


const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Kail Hamili', email: 'admin@admin.com', confirmed: 'Yes', roles: 'Administrator', permissions: 'None', created: '1 minute ago', updated: '1 minute ago' },
    { id: 2, name: 'Default User', email: 'guest@guest.com', confirmed: 'Yes', roles: 'User', permissions: 'None', created: '1 minute ago', updated: '1 minute ago' },
    // Add more users here
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User Management</h2>
      <div className="button-user">
        <button className="add-user-btn">Add User</button>
        <button className= "manage-user-btn">Manage User</button>
        </div>
      <input
        type="text"
        placeholder="Search users... 🔍"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Confirmed</th>
            <th>Roles</th>
            <th>Other Permissions</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className="status-yes">{user.confirmed}</span></td>
              <td>{user.roles}</td>
              <td>{user.permissions}</td>
              <td>{user.created}</td>
              <td>{user.updated}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;