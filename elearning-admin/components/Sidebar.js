'use client'; // Required for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Courses', href: '/dashboard/courses', icon: '📚' },
    { name: 'Users', href: '/dashboard/users', icon: '👥' },
    { name: 'Enrollments', href: '/dashboard/enrollments', icon: '🧾' },
    { name: 'Notifications', href: '/dashboard/notifications', icon: '🔔' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙' },
  ];

  return (
    <div
      className="sidebar bg-dark text-white p-3 vh-100 position-fixed"
      style={{ width: '220px' }}
    >
      <div className="mb-4 text-center">
        <h4 className="fw-bold mb-0" style={{ letterSpacing: '1px' }}>
          📘 E-Learning
        </h4>
        <small className="text-secondary">Admin Panel</small>
      </div>
      <ul className="nav flex-column mt-4">
        {navItems.map((item) => (
          <li className="nav-item mb-2" key={item.href}>
            <Link
              href={item.href}
              className={classNames(
                'nav-link d-flex align-items-center px-2 py-2 rounded',
                pathname === item.href
                  ? 'bg-light text-dark fw-semibold'
                  : 'text-white',
                'hover-opacity'
              )}
            >
              <span className="me-2">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
