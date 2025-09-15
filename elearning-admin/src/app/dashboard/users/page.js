// src/app/dashboard/users/page.js
'use client';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('elearning_users') || '[]');
    if (stored.length === 0) {
      // seed example
      const seed = [
        {
          id: makeId(),
          name: 'Ravi',
          email: 'ravi@example.com',
          role: 'student',
          blocked: false,
        },
        {
          id: makeId(),
          name: 'Amit',
          email: 'amit@example.com',
          role: 'instructor',
          blocked: false,
        },
      ];
      localStorage.setItem('elearning_users', JSON.stringify(seed));
      setUsers(seed);
    } else setUsers(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('elearning_users', JSON.stringify(users));
  }, [users]);

  function toggleBlock(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u))
    );
  }

  function changeRole(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: u.role === 'student' ? 'instructor' : 'student' }
          : u
      )
    );
  }

  function openAdd() {
    setEditing(null);
    setShowModal(true);
  }

  function openEdit(user) {
    setEditing(user);
    setShowModal(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
      id: editing?.id || makeId(),
      name: f.name.value,
      email: f.email.value,
      role: f.role.value,
      blocked: editing?.blocked || false,
    };
    if (editing)
      setUsers((prev) => prev.map((u) => (u.id === editing.id ? data : u)));
    else setUsers((prev) => [data, ...prev]);

    setShowModal(false);
  }

  const filtered = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (
      q &&
      !u.name.toLowerCase().includes(q.toLowerCase()) &&
      !u.email.toLowerCase().includes(q.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div>
      <h1 className="mb-4">Users</h1>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex gap-2">
          <input
            placeholder="Search name or email"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="form-control"
          />
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
          </select>
        </div>
        <div>
          <button className="btn btn-primary" onClick={openAdd}>
            Add User
          </button>
        </div>
      </div>

      <table className="table bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.blocked ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => openEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => changeRole(u.id)}
                >
                  Toggle Role
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => toggleBlock(u.id)}
                >
                  {u.blocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No users
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        show={showModal}
        title={editing ? 'Edit User' : 'Add User'}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSave}>
          <div className="mb-2">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              defaultValue={editing?.name || ''}
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              defaultValue={editing?.email || ''}
              required
            />
          </div>
          <div className="mb-2">
            <label>Role</label>
            <select
              name="role"
              className="form-select"
              defaultValue={editing?.role || 'student'}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
