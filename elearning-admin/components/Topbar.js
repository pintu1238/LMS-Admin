// src/components/Topbar.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Topbar() {
  const [unread, setUnread] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const notes = JSON.parse(
      localStorage.getItem('elearning_notifications') || '[]'
    );
    setUnread(notes.filter((n) => !n.read).length);
  }, []);

  // subscribe to storage events (other tabs)
  useEffect(() => {
    function onStorage() {
      const notes = JSON.parse(
        localStorage.getItem('elearning_notifications') || '[]'
      );
      setUnread(notes.filter((n) => !n.read).length);
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function handleLogout() {
    // just redirect to login (clear any local token if you make one)
    router.push('/auth/login');
  }

  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Admin Panel</span>
        <div className="d-flex align-items-center gap-3">
          <Link
            href="/dashboard/notifications"
            className="btn btn-outline-secondary position-relative"
          >
            🔔
            {unread > 0 && (
              <span
                className="badge bg-danger position-absolute"
                style={{ top: -6, right: -6 }}
              >
                {unread}
              </span>
            )}
          </Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
