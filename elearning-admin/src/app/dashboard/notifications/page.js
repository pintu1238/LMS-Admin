// src/app/dashboard/notifications/page.js
'use client';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(
      JSON.parse(localStorage.getItem('elearning_notifications') || '[]')
    );
  }, []);

  function markRead(id) {
    const updated = notes.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotes(updated);
    localStorage.setItem('elearning_notifications', JSON.stringify(updated));
  }

  function clearAll() {
    if (!confirm('Clear all notifications?')) return;
    setNotes([]);
    localStorage.setItem('elearning_notifications', JSON.stringify([]));
  }

  return (
    <div>
      <h1 className="mb-4">Notifications</h1>
      <div className="mb-2">
        <button className="btn btn-sm btn-danger me-2" onClick={clearAll}>
          Clear All
        </button>
      </div>
      <ul className="list-group">
        {notes.length === 0 && (
          <li className="list-group-item text-center">No notifications</li>
        )}
        {notes.map((n) => (
          <li
            key={n.id}
            className={
              'list-group-item d-flex justify-content-between align-items-start ' +
              (n.read ? '' : '')
            }
          >
            <div>
              <div>
                <strong>{n.text}</strong>
              </div>
              <small className="text-muted">
                {new Date(n.date).toLocaleString()}
              </small>
            </div>
            {!n.read && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => markRead(n.id)}
              >
                Mark read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
