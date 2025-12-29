import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import "../App.css";

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    resourceName: "",
    category: "",
    totalQuantity: "",
    availableQuantity: "",
    location: "",
    latitude: "",
    longitude: ""
  });

  const loadResources = async () => {
    const res = await axios.get("http://localhost:5000/api/resources");
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const addResource = async () => {
    await axios.post("http://localhost:5000/api/resources", {
      ...form,
      totalQuantity: Number(form.totalQuantity),
      availableQuantity: Number(form.availableQuantity),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    });
    setForm({
      resourceName: "",
      category: "",
      totalQuantity: "",
      availableQuantity: "",
      location: "",
      latitude: "",
      longitude: ""
    });
    loadResources();
  };

  const criticalCount = resources.filter(
    r => r.availableQuantity < 500
  ).length;

  return (
    <div className="container">
      <h1>📊 Disaster Relief Dashboard</h1>

      <div className="grid">
        <StatCard title="Total Resources" value={resources.length} />
        <StatCard
          title="Total Available"
          value={resources.reduce((s, r) => s + r.availableQuantity, 0)}
        />
        <StatCard title="Critical" value={criticalCount} />
      </div>

      {/* ADD FORM */}
      <div className="card">
        {Object.keys(form).map(key => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button onClick={addResource}>Add Resource</button>
      </div>

      {/* LIST */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Available</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(r => (
            <tr key={r._id}>
              <td>{r.resourceName}</td>
              <td>{r.availableQuantity}</td>
              <td>{r.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
