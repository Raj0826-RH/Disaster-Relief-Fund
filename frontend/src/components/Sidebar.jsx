import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🌍 Relief Find</h2>

      <NavLink to="/" end>📊 Dashboard</NavLink>
      <NavLink to="/map">🗺️ Disaster Map</NavLink>
      <NavLink to="/analytics">📈 Analytics</NavLink>
      <NavLink to="/resources">📦 Resources</NavLink>

    </div>
  );
}
