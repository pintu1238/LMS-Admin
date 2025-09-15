// src/app/dashboard/page.js
import AnalyticsCharts from '../../../components/AnalyticsCharts';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card p-3">
            <div>Total Students</div>
            <h3>{/* dynamic count via client chart component if needed */}—</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div>Total Courses</div>
            <h3>{/* show from localStorage in charts component */}—</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div>Revenue</div>
            <h3>—</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <div>Recent Activity</div>
            <h3>—</h3>
          </div>
        </div>
      </div>

      <AnalyticsCharts />
    </div>
  );
}
