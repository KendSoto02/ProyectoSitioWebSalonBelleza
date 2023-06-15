import "./TwoSectionMap.css";
import { GoogleMap, Marker } from "@react-google-maps/api";

const TwoColumnSectionMap = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 51.5074, // Latitud de la ubicación
    lng: -0.1278, // Longitud de la ubicación
  };

  const apiKey = "La clve de la api va aqui";

  return (
    <section className="two-column">
      <div className="column">
        <div className="map-container">
          <div className="column2" style={{ textAlign: "left" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4134.191762067585!2d-84.21516684849206!3d10.013929585578884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9c6790b377b%3A0x68e11ec5b1b623b1!2sLady%20M.%20Sal%C3%B3n!5e1!3m2!1ses!2scr!4v1686183219103!5m2!1ses!2scr"
              width="700"
              height="400"
              style={{ border: 0, borderRadius: "20px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="column">
        <h2>¿Donde estamos ubicados?</h2>
        <p>
          300 mts este de la plaza de deportes en tambor de Alajuela frente a
          súper quincho portón negro con madera.
        </p>
        <p>Atendemos de 8 am a 6 pm </p>
        <a
          href="https://api.whatsapp.com/send?phone=89904312"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacto
        </a>
      </div>
    </section>
  );
};


export default TwoColumnSectionMap;
