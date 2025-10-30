import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Starlink() {
  const [satelites, setSatelites] = useState([]);

  useEffect(() => {
    const fetchSatelites = async () => {
      const response = await axios.post(
        "https://api.spacexdata.com/v4/starlink/query",
        {
          query: {},
          options: { limit: 100 },
        }
      );

      setSatelites(response.data.docs);
      console.log(response.data);
    };
    fetchSatelites();
  }, []);

  const ocean = [-3.0925454075226755, -60.0185281];

  return (
    <>
      <h1>Lista de Satélites Starlink. Total: {satelites.length}</h1>

      {/* Lista das localizações */}
      {/* <ul>
        {satelites
          .filter((sat) => sat.latitude && sat.longitude)
          .map((sat) => (
            <li key={sat.id}>
              {sat.spaceTrack.OBJECT_NAME} LAT {sat.latitude} LONG
              {sat.longitude}
            </li>
          ))}
      </ul> */}

      {/* Mapa */}
      <MapContainer
        center={ocean}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "70vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
}

export default Starlink;
