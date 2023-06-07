import './TwoSectionMap.css';
import { GoogleMap, Marker } from '@react-google-maps/api';

const TwoColumnSectionMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 51.5074, // Latitud de la ubicación
    lng: -0.1278, // Longitud de la ubicación
  };

  const apiKey = 'La clve de la api va aqui';

  return (
    <section className="two-column">
      <div className="column">
        <div className="map-container">
          
          
        </div>
      </div>
      <div className="column">
        <h2>¿Donde estamos ubicados?</h2>
        <p>Nos podes encontrar en el Coyol, Alajuela</p>
        <a href="#contacto">Contacto</a>
      </div>
    </section>
  );
};

// <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={15}
//             apiKey={apiKey} 
//           >
//             <Marker position={center} />
//           </GoogleMap>

export default TwoColumnSectionMap;