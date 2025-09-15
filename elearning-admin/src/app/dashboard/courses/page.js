// src/app/dashboard/courses/page.js
'use client';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem('elearning_courses') || '[]'
    );
    setCourses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('elearning_courses', JSON.stringify(courses));
  }, [courses]);

  function openAdd() {
    setEditing(null);
    setShowModal(true);
  }

  function openEdit(course) {
    setEditing(course);
    setShowModal(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
      id: editing?.id || makeId(),
      title: f.title.value,
      description: f.description.value,
      instructor: f.instructor.value,
      price: f.price.value || '0',
      category: f.category.value || 'General',
      status: f.status.value || 'active',
    };

    if (editing) {
      setCourses((prev) => prev.map((c) => (c.id === editing.id ? data : c)));
    } else {
      setCourses((prev) => [data, ...prev]);
      // add notification
      const notes = JSON.parse(
        localStorage.getItem('elearning_notifications') || '[]'
      );
      notes.unshift({
        id: makeId(),
        text: `New course added: ${data.title}`,
        date: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem('elearning_notifications', JSON.stringify(notes));
    }

    setShowModal(false);
  }

  function handleDelete(id) {
    if (!confirm('Delete this course?')) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <h1 className="mb-4">Courses</h1>
      <div className="mb-3 d-flex justify-content-between">
        <button className="btn btn-primary" onClick={openAdd}>
          Add Course
        </button>
      </div>

      <table className="table table-striped bg-white">
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Category</th>
            <th>Status</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.instructor}</td>
              <td>{c.price}</td>
              <td>{c.category}</td>
              <td>{c.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => openEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No courses yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        show={showModal}
        title={editing ? 'Edit Course' : 'Add Course'}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSave}>
          <div className="mb-2">
            <label>Title</label>
            <input
              name="title"
              className="form-control"
              defaultValue={editing?.title || ''}
              required
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              defaultValue={editing?.description || ''}
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
              <label>Instructor</label>
              <input
                name="instructor"
                className="form-control"
                defaultValue={editing?.instructor || ''}
              />
            </div>
            <div className="col">
              <label>Price</label>
              <input
                name="price"
                className="form-control"
                defaultValue={editing?.price || '0'}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label>Category</label>
              <input
                name="category"
                className="form-control"
                defaultValue={editing?.category || 'General'}
              />
            </div>
            <div className="col">
              <label>Status</label>
              <select
                name="status"
                className="form-select"
                defaultValue={editing?.status || 'active'}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary">
              {editing ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
