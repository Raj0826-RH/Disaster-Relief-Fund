import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToLocation({ selected }) {
  const map = useMap();

  if (selected) {
    map.setView(
      [selected.latitude, selected.longitude],
      10,
      { animate: true }
    );
  }

  return null;
}

export default function DisasterMap({ resources, selected }) {
  return (
    <div className="card">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation selected={selected} />

        {resources.map(r => (
          <Marker
            key={r._id}
            position={[r.latitude, r.longitude]}
          >
            <Popup>
              <strong>{r.resourceName}</strong><br/>
              Available: {r.availableQuantity}<br/>
              {r.location}<br/><br/>

              <a
                href={`https://www.google.com/maps?q=${r.latitude},${r.longitude}`}
                target="_blank"
              >
                Open in Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
