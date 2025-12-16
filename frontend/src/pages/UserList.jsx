import React, { useState } from 'react';

const UserList = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setNewUser({
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  required
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Username</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Joined</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div className="font-medium">{user.username}</div>
                  </td>
                  <td className="p-2">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'N/A'}
                  </td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-2 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {user.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn btn-danger text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
