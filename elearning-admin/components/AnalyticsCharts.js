// src/components/AnalyticsCharts.js
'use client';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsCharts() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('elearning_courses') || '[]');
    const e = JSON.parse(localStorage.getItem('elearning_enrollments') || '[]');
    setCourses(c);
    setEnrollments(e);
  }, []);

  // Pie: students per course
  const pieLabels = courses.map((c) => c.title || 'Untitled');
  const pieDataValues = courses.map((c) => {
    return enrollments.filter((en) => en.courseId === c.id).length;
  });

  // Line: monthly revenue (from enrollments using course.price)
  const monthsMap = {};
  enrollments.forEach((en) => {
    const d = new Date(en.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    const course = courses.find((cc) => cc.id === en.courseId);
    const price = course?.price ? Number(course.price) : 0;
    monthsMap[key] = (monthsMap[key] || 0) + price;
  });
  const monthKeys = Object.keys(monthsMap).sort();
  const monthValues = monthKeys.map((k) => monthsMap[k]);

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Students per Course</h5>
              {pieLabels.length ? (
                <Pie
                  data={{
                    labels: pieLabels,
                    datasets: [{ data: pieDataValues, label: 'Enrollments' }],
                  }}
                />
              ) : (
                <p>No courses yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Monthly Revenue</h5>
              {monthKeys.length ? (
                <Line
                  data={{
                    labels: monthKeys,
                    datasets: [
                      { label: 'Revenue', data: monthValues, fill: false },
                    ],
                  }}
                />
              ) : (
                <p>No enrollments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
