import axios from "axios";
import { useEffect, useState } from "react";

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

  return (
    <>
      <h1>Lista de Satélites Starlink. Total: {satelites.length}</h1>

      <ul>
        {satelites
          .filter((sat) => sat.latitude && sat.longitude)
          .map((sat) => (
            <li key={sat.id}>
              {sat.spaceTrack.OBJECT_NAME} LAT {sat.latitude} LONG
              {sat.longitude}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Starlink;
