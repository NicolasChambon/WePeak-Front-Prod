// Import necessary libraries
import { TbClockHour8 } from 'react-icons/tb';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';

import './ActivityIllustration.scss';

const ActivityIllustration = ({
  date,
  adressNumber,
  adressRoad,
  adressPostcode,
  adressCity,
  lat,
  lng,
}) => {
  // allow to change the view of the map if user change activity page
  // then we integrate <ChangeView /> component in the map in jsx part
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <div className="ActivityIllustration">
      <div className="ActivityIllustration-imgContainer">
        {/* TODO Dynamisation of activity picture when available in API */}
        <img
          src="https://idata.over-blog.com/0/08/49/95/Ski-de-Rando-2011/P1000329.jpg"
          alt=""
        />
      </div>

      <div className="ActivityIllustration-mapCard">
        <div className="ActivityIllustration-mapCard-info">
          <div className="ActivityIllustration-mapCard-info-date">
            <TbClockHour8 className="ActivityIllustration-mapCard-info-date icon" />
            <p>
              <span>Date et heure de départ</span> <br />{' '}
              {new Date(date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </div>

          <div className="ActivityIllustration-mapCard-info-location">
            <HiOutlineLocationMarker className="ActivityIllustration-mapCard-info-location icon" />
            <p>
              <span>Lieu de rendez-vous</span> <br /> {adressNumber}{' '}
              {adressRoad} <br /> {adressPostcode} {adressCity}
            </p>
          </div>
        </div>

        <div className="ActivityIllustration-mapCard-map">
          <MapContainer className="map-container" center={[lat, lng]} zoom={15}>
            <ChangeView center={[lat, lng]} zoom={15} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

ActivityIllustration.propTypes = {
  date: PropTypes.string.isRequired,
  adressNumber: PropTypes.string.isRequired,
  adressRoad: PropTypes.string.isRequired,
  adressPostcode: PropTypes.string.isRequired,
  adressCity: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default ActivityIllustration;