import React, { useState, Fragment } from 'react';
import KeywordInput from './KeywordInput';
import LocationSelector from './LocationSelector';
import Results from './Results';
import './Search.css';
import axios from 'axios';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);
  const [location, updateLocation] = useState(-1);
  const [likes, updateLikes] = useState([]);
  const [dislikes, updateDislikes] = useState([]);
  const locations = {
    0: 'New York',
    1: 'Dublin',
    2: 'California',
    3: 'Istanbul',
    4: 'Izmir',
    5: 'Oslo'
  };
  const [results, updateResults] = useState([
    {
      name: 'McDonalds',
      distance: 1
    },
    {
      name: 'Chick fil a',
      distance: 1
    }
  ]);

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

  const apiKey = process.env.REACT_APP_YELP_API_KEY;

  const queryYelpAPI = () => {
    const id = `WavvLdfdP6g8aZTtbBQHTw`;
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const formSubmit = e => {
    queryAPI();
    e.preventDefault(e);
  }

  return (
    <Fragment>
      <form className='search-area' onSubmit={formSubmit}>
        <div className='form-row-1'>
          <div className='keyword-search'>
            <KeywordInput keywords={keywords} handleChange={updateKeywords} placeholderText={'Enter some keywords...'} />
          </div>
          <div className='location-selector'>
            <LocationSelector
              locations={Object.entries(locations)}
              location={location}
              setLocation={updateLocation}
            />
          </div>
          <button className='submit' type='submit'>Search!</button>
        </div>
        <div className='form-row-2'>
          <div className='input-restaurant likes'>
            <KeywordInput keywords={likes} handleChange={updateLikes} placeholderText={'Enter some restaurants you like...'} />
          </div>
          <div className='input-restaurant dislikes'>
            <KeywordInput keywords={dislikes} handleChange={updateDislikes} placeholderText={'Enter some restaurants you don\'t like...'} />
          </div>
        </div>
      </form>
      <div className='results-area'>
        <Results
          results={results}
        />
      </div>
    </Fragment>
  );
}

export default Search;
