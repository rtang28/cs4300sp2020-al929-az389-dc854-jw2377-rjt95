import React, { useState, Fragment } from 'react';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';
import KeywordInput from './KeywordInput';
import LocationSelector from './LocationSelector';
import Results from './Results';
import './Search.css';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);
  const [location, updateLocation] = useState(-1);
  const [likes, updateLikes] = useState([]);
  const [dislikes, updateDislikes] = useState([]);
  const [results, updateResults] = useState([
    {
      name: 'Gary Danko',
      distance: 1,
      categories: [],
      id: 'WavvLdfdP6g8aZTtbBQHTw'
    }
  ]);

  const addLike = rest => {
    if (!likes.some(l => l.id === rest.id))
      updateLikes([...likes, rest]);
  }

  const removeLike = i => {
    console.log(i);
    const temp = [...likes];
    temp.splice(i, 1);
    updateLikes(temp);
  }

  const addDislike = rest => {
    if (!dislikes.some(l => l.id === rest.id))
      updateDislikes([...dislikes, rest]);
  }

  const removeDislike = i => {
    console.log(i);
    const temp = [...dislikes];
    temp.splice(i, 1);
    updateDislikes(temp);
  }

  const locations = {
    0: 'Montreal',
    1: 'Las Vegas',
    2: 'Phoenix',
    3: 'Pittsburgh',
    4: 'Toronto',
    5: 'Cleveland',
    6: 'Calgary',
    7: 'Charlotte',
    8: 'Madison',
    9: 'Danville'
  };
  // TODO replace with actual data
  const restaurants = [
    { 'id': 235, 'name': 'The Odyssey Diner' },
    { 'id': 55, 'name': 'Louie\'s Lunch' }
  ];

  const buildQueryURLFromState = (currKeywords, currLocation) => {
    let baseURL = `${window.location}search`;
    let keywordsString = currKeywords.toString().replace(/ /g, '%20');
    let locString = `${currLocation}`;
    baseURL += `${(currKeywords ? '?keywords=' + keywordsString : '')}`;
    if (currLocation >= 0)
      baseURL += `${(currKeywords ? '&' : '?')}location=${locString}`;

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
      var restaurants = json.data.results;
      // updateResults(results);
      queryYelpAPI(restaurants);
    }
  };

  const apiKey = process.env.REACT_APP_YELP_API_KEY;

  const queryYelpAPI = async (restaurants) => {
    try {
      for (var i = 0; i < restaurants.length; i++) {
        var yelp_data = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${restaurants[i].id}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
        })
        restaurants[i].url = yelp_data.url;
        restaurants[i].yelp_rating = yelp_data.rating;
        restaurants[i].location = yelp_data.location.city;
        restaurants[i].image_url = yelp_data.image_url;
      }
      updateResults(restaurants);
    } catch (error) {
      console.log(error);
    }
  }

  const formSubmit = e => {
    queryAPI();
    e.preventDefault(e);
  }

  return (
    <Fragment>
      <form autoComplete='off' className='search-area' onSubmit={formSubmit}>
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
            <ReactTags
              tags={likes}
              suggestions={restaurants}
              handleAddition={addLike}
              handleDelete={removeLike}
              placeholder={likes.length ? '' : 'Enter restaurants you like...'}
               />
            {/* <KeywordInput keywords={likes} handleChange={updateLikes} placeholderText={'Enter some restaurants you like...'} /> */}
          </div>
          <div className='input-restaurant dislikes'>
            <ReactTags
              tags={dislikes}
              suggestions={restaurants}
              handleAddition={addDislike}
              handleDelete={removeDislike}
              placeholder={dislikes.length ? '' : 'Enter restaurants you don\'t like...'}
               />
            {/* <KeywordInput keywords={dislikes} handleChange={updateDislikes} placeholderText={'Enter some restaurants you don\'t like...'} /> */}
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
