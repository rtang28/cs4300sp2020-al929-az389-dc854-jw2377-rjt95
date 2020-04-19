import React, { useState } from 'react';
import KeywordInput from './KeywordInput';
import LocationSelector from './LocationSelector';
import Results from './Results';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);
  const [selected, updateSelected] = useState(-1);
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
  const [results, updateResults] = useState([{
    name: "mcdonalds",
    distance: 1
  }]);

  const buildQueryURLFromState = (currKeywords, currSelected) => {
    let baseURL = `${window.location}search`;
    let keywordsString = currKeywords.toString().replace(/ /g, '%20');
    let locString = `${currSelected}`;
    baseURL += `${(currKeywords ? '?keywords=' + keywordsString : '')}`;
    if (currSelected >= 0)
      baseURL += `${(currKeywords ? '&' : '?')}zip=${locString}`;

    return baseURL;
  };

  const queryAPI = async () => {
    const queryURL = buildQueryURLFromState(keywords, selected);
    // const queryURL = `${window.location}search`;
    let response = await (fetch(queryURL, { method: 'GET' }));
    console.log(response);
    let json = await (response.json());
    console.log(json);
    updateResults(json.data.results);
  };

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
      <button onClick={queryAPI}>Search!</button>
      <div className='results'>
        <Results
          results={results}
        />
      </div>
    </div>
  );
}

export default Search;
