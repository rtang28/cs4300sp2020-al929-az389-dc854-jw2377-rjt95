import React from 'react';
import PropTypes from 'prop-types';

/**
 * Implements a dropdown menu that selects locations.
 */
const LocationSelector = ({ locations, location, setLocation }) => {
  return (
    <select className='location-select'
            value={location}
            onChange={e => {setLocation(e.target.value === "" ? null : parseInt(e.target.value, 10))}}>
      <option disabled hidden value='-1'>Choose a location</option>>
      {locations.map(([k, locationName]) => <option key={k} value={k}>{locationName}</option>)}
    </select>
  );
}

LocationSelector.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.array).isRequired,
  location: PropTypes.number.isRequired,
  setLocation: PropTypes.func.isRequired
}

export default LocationSelector;
