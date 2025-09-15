// src/app/dashboard/layout.js
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Topbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-light">{children}</main>
      </div>
    </div>
  );
}
