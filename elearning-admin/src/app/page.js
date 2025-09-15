'use client';

export default function Dashboard() {
  const stats = [
    { title: 'Total Users', value: 1200, icon: '👥' },
    { title: 'Courses', value: 42, icon: '📚' },
    { title: 'Enrollments', value: 2314, icon: '🧾' },
    { title: 'Revenue', value: '$14,230', icon: '💰' },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4 fw-bold">📊 Dashboard Overview</h2>
      <div className="row">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={index}>
            <div className="dashboard-card card shadow-sm h-100 border-0">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">{stat.icon}</div>
                <h6 className="text-muted">{stat.title}</h6>
                <h3 className="fw-bold mt-2">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
