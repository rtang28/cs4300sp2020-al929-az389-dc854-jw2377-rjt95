import React, { useState, Fragment } from 'react';
import KeywordInput from './KeywordInput';
import LocationSelector from './LocationSelector';
import Results from './Results';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);
  const [location, updateLocation] = useState(-1);
  const [likes, updateLikes] = useState([]);
  const [dislikes, updateDislikes] = useState([]);
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
  const [results, updateResults] = useState([]);

  const buildQueryURLFromState = (currKeywords, currLocation) => {
    let baseURL = `${window.location}search`;
    let keywordsString = currKeywords.toString().replace(/ /g, '%20');
    let locString = `${currLocation}`;
    baseURL += `${(currKeywords ? '?keywords=' + keywordsString : '')}`;
    if (currLocation >= 0)
      baseURL += `${(currKeywords ? '&' : '?')}zip=${locString}`;

    return baseURL;
  };

  const queryAPI = async () => {
    if (keywords.length > 0 || location >= 0) {
      const queryURL = buildQueryURLFromState(keywords, location);
      console.log(queryURL);
      // const queryURL = `${window.location}search`;
      let response = await (fetch(queryURL, { method: 'GET' }));
      console.log(response);
      let json = await (response.json());
      console.log(json);
      updateResults(json.data.results);
    }
  };

  const formSubmit = e => {
    queryAPI();
    e.preventDefault(e);
  }

  return (
    <Fragment>
      <form className='search-area' onSubmit={formSubmit}>
        <div className='form-row-1'>
          <div className='keyword-search'>
            <KeywordInput keywords={keywords} handleChange={updateKeywords} placeholderText={'Enter some keywords...'}/>
          </div>
          <div className='location-selector'>
            <LocationSelector
              locations={locations}
              selected={location}
              setSelected={updateLocation}
            />
          </div>
        </div>
        <div className='form-row-2'>
          <div className='input-restaurant likes'>
            <KeywordInput keywords={likes} handleChange={updateLikes} placeholderText={'Enter some restaurants you like...'}/>
          </div>
          <div className='input-restaurant dislikes'>
            <KeywordInput keywords={dislikes} handleChange={updateDislikes} placeholderText={'Enter some restaurants you don\'t like...'}/>
          </div>
        </div>
        <button className='submit' type='submit'>Search!</button>
      </form>
      <div className='results'>
        <Results
          results={results}
        />
      </div>
    </Fragment>
  );
}

export default Search;
