import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import "../App.css";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

export default function Analytics() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resources")
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, []);

  // ====== CALCULATIONS ======
  const totalResources = resources.length;

  const totalAvailable = resources.reduce(
    (sum, r) => sum + (r.availableQuantity || 0),
    0
  );

  const criticalResources = resources.filter(
    r => r.availableQuantity < 500
  ).length;

  // Category-wise data
  const categoryData = Object.values(
    resources.reduce((acc, r) => {
      acc[r.category] = acc[r.category] || {
        name: r.category,
        value: 0
      };
      acc[r.category].value += r.availableQuantity;
      return acc;
    }, {})
  );

  // Location-wise data
  const locationData = resources.map(r => ({
    name: r.location,
    available: r.availableQuantity
  }));

  return (
    <div className="container">
      <h1>📈 Analytics</h1>

      {/* SUMMARY CARDS */}
      <div className="grid">
        <div className="stat-card">
          <h3>Total Resources</h3>
          <h2>{totalResources}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Available</h3>
          <h2>{totalAvailable}</h2>
        </div>

        <div className="stat-card">
          <h3>Critical Resources</h3>
          <h2>{criticalResources}</h2>
        </div>
      </div>

      {/* CATEGORY PIE CHART */}
      <div className="card">
        <h3>Resources by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LOCATION BAR CHART */}
      <div className="card">
        <h3>Available Resources by Location</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="available" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
