import React from 'react';
import '../index.css';

/**
 * Implements a dropdown menu that selects locations.
 */
const LocationSelector = ({ locations, location, setLocation }) => {
  console.log(location);
  return (
    <select className='location-select'
            value={location}
            onChange={e => {setLocation(e.target.value === "" ? null : e.target.value)}}>
      <option disabled hidden value='-1'>Choose a location</option>>
      {locations.map(([k, locationName]) => <option key={k} value={k}>{locationName}</option>)}
    </select>
  );
}

export default LocationSelector;
