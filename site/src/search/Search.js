import React, { useState, Fragment, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete';
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
  const [restaurants, updateRestaurants] = useState({});

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

  const locationNames = { 0: 'Montreal', 1: 'Las Vegas', 2: 'Phoenix', 3: 'Pittsburgh', 4: 'Toronto',
                      5: 'Cleveland', 6: 'Calgary', 7: 'Charlotte', 8: 'Madison', 9: 'Danville' };

  useEffect(() => {
    const load = async () => {
      let f = await fetch('../location_restaurants.json');
      let temp = await f.json();
      for (let [city, rests] of Object.entries(temp)) {
        const new_rests = rests.map((r, i) => ({ 'name': r, 'id': i}));
        temp[city] = new_rests;
      }
      updateRestaurants(temp);
    };
    try {
      load();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const buildQueryURLFromState = (currKeywords, currLocation) => {
    let baseURL = `${window.location}search`;
    let keywordsString = currKeywords.toString().replace(/ /g, '%20');
    let locString = `${locationNames[currLocation]}`;
    let likesString = likes.toString().replace(/ /g, '%20');
    let dislikesString = dislikes.toString().replace(/ /g, '%20');

    console.log(likesString);
    console.log(dislikesString);
    baseURL += `${(currKeywords ? '?keywords=' + keywordsString : '')}`;
    if (currLocation >= 0)
      baseURL += `${(currKeywords ? '&' : '?')}location=${locString}`;
    if (likes.length)
      baseURL += `&likes=${likesString}`;
    if (dislikes.length)
      baseURL += `&dislikes=${dislikesString}`;

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
        // var id = restaurants[i].id;
        var id = 'WavvLdfdP6g8aZTtbBQHTw';
        // var cors_url = 'https://cors-anywhere.herokuapp.com/';
        var cors_url = '';
        var query_url = cors_url + `https://api.yelp.com/v3/businesses/${id}`;
        var yelp_data = await (fetch(query_url, {
          method: 'GET',
          headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "e519606f-c291-4578-b743-683704377b7f"
          }
        }));
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
              locations={Object.entries(locationNames)}
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
              suggestions={restaurants[locationNames[location]]}
              handleAddition={addLike}
              handleDelete={removeLike}
              placeholder={likes.length ? '' : 'Enter restaurants you like...'}
               />
            {/* <KeywordInput keywords={likes} handleChange={updateLikes} placeholderText={'Enter some restaurants you like...'} /> */}
          </div>
          <div className='input-restaurant dislikes'>
            <ReactTags
              tags={dislikes}
              suggestions={restaurants[locationNames[location]]}
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
