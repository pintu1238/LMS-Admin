import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/main.scss';

// import Sidebar from '@/components/Sidebar';
// import Topbar from '@/components/Topbar';
// src/app/layout.js
import Sidebar from '../../components/Sidebar';
// import Topbar from '../../components/Topbar';

export const metadata = {
  title: 'E-Learning Admin',
  description: 'Admin Panel with Next.js + Bootstrap',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex">
          <Sidebar />
          <div className="main__content w-100">
            {/* <Topbar /> */}
            <main className="main__inner container-fluid py-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
