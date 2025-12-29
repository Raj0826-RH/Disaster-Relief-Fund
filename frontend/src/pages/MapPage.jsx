import { useEffect, useState } from "react";
import axios from "axios";
import DisasterMap from "../components/DisasterMap";

export default function MapPage() {
  const [resources, setResources] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/resources")
      .then(res => setResources(res.data));
  }, []);

  return (
    <div className="container">
      <h1>📍 Disaster Locations</h1>

      <DisasterMap
        resources={resources}
        selected={selected}
      />

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
            <tr
              key={r._id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(r)}
            >
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
