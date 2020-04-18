import React, { useState } from 'react';
import KeywordInput from './KeywordInput';
import LocationSelector from './LocationSelector';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);
  const [selected, updateSelected] = useState(0);
  const locations = [
    {
      id: 0,
      title: 'New York',
    },
    {
      id: 1,
      title: 'Dublin',
    },
    {
      id: 2,
      title: 'California',
    },
    {
      id: 3,
      title: 'Istanbul',
    },
    {
      id: 4,
      title: 'Izmir',
    },
    {
      id: 5,
      title: 'Oslo',
    }
  ];

  return (
    <div>
      <div className='keyword-search'>
        <KeywordInput keywords={keywords} handleChange={updateKeywords} />
      </div>
      <div className='location-selector'>
        <LocationSelector
          locations={locations}
          selected={selected}
          setSelected={updateSelected}
        />
      </div>
    </div>
  );

}

export default Search;
