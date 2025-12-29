import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Resources() {
  const [form, setForm] = useState({
    resourceName: "",
    category: "",
    totalQuantity: "",
    availableQuantity: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const [resources, setResources] = useState([]);

  // Load resources from backend
  const loadResources = async () => {
    const res = await axios.get("http://localhost:5000/api/resources");
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  // Add resource
  const addResource = async () => {
    try {
      await axios.post("http://localhost:5000/api/resources", {
        resourceName: form.resourceName,
        category: form.category,
        totalQuantity: Number(form.totalQuantity),
        availableQuantity: Number(form.availableQuantity),
        location: form.location,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      });

      alert("Resource added successfully ✅");

      setForm({
        resourceName: "",
        category: "",
        totalQuantity: "",
        availableQuantity: "",
        location: "",
        latitude: "",
        longitude: "",
      });

      loadResources();
    } catch (err) {
      alert("Failed to add resource ❌");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>📦 Disaster Relief Resources</h1>

      <div className="card">
        <input placeholder="Resource Name"
          value={form.resourceName}
          onChange={e => setForm({ ...form, resourceName: e.target.value })}
        />
        <input placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input placeholder="Total Quantity"
          value={form.totalQuantity}
          onChange={e => setForm({ ...form, totalQuantity: e.target.value })}
        />
        <input placeholder="Available Quantity"
          value={form.availableQuantity}
          onChange={e => setForm({ ...form, availableQuantity: e.target.value })}
        />
        <input placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input placeholder="Latitude"
          value={form.latitude}
          onChange={e => setForm({ ...form, latitude: e.target.value })}
        />
        <input placeholder="Longitude"
          value={form.longitude}
          onChange={e => setForm({ ...form, longitude: e.target.value })}
        />

        <button onClick={addResource}>Add Resource</button>
      </div>

      <h2>Resource List</h2>
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
