// src/app/dashboard/enrollments/page.js
'use client';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function EnrollmentsPage() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('elearning_users') || '[]'));
    setCourses(JSON.parse(localStorage.getItem('elearning_courses') || '[]'));
    setEnrollments(
      JSON.parse(localStorage.getItem('elearning_enrollments') || '[]')
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('elearning_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  function openEnroll() {
    setShowModal(true);
  }

  function handleEnroll(e) {
    e.preventDefault();
    const userId = e.target.userId.value;
    const courseId = e.target.courseId.value;
    const id = makeId();
    const newEn = { id, userId, courseId, date: new Date().toISOString() };
    setEnrollments((prev) => [newEn, ...prev]);

    // add notification
    const notes = JSON.parse(
      localStorage.getItem('elearning_notifications') || '[]'
    );
    const u = users.find((x) => x.id === userId);
    const c = courses.find((x) => x.id === courseId);
    notes.unshift({
      id: makeId(),
      text: `${u?.name || 'User'} enrolled in ${c?.title || 'Course'}`,
      date: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem('elearning_notifications', JSON.stringify(notes));

    setShowModal(false);
  }

  function format(en) {
    const user = users.find((u) => u.id === en.userId) || { name: 'Unknown' };
    const course = courses.find((c) => c.id === en.courseId) || {
      title: 'Unknown',
    };
    return `${user.name} → ${course.title} (${new Date(
      en.date
    ).toLocaleString()})`;
  }

  return (
    <div>
      <h1 className="mb-4">Enrollments</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={openEnroll}>
          Add Enrollment
        </button>
      </div>

      <ul className="list-group">
        {enrollments.map((en) => (
          <li key={en.id} className="list-group-item">
            {format(en)}
          </li>
        ))}
        {enrollments.length === 0 && (
          <li className="list-group-item text-center">No enrollments yet</li>
        )}
      </ul>

      <Modal
        show={showModal}
        title="Add Enrollment"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleEnroll}>
          <div className="mb-2">
            <label>Student</label>
            <select name="userId" className="form-select" required>
              <option value="">Select student</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label>Course</label>
            <select name="courseId" className="form-select" required>
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
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
            <button className="btn btn-primary">Enroll</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
