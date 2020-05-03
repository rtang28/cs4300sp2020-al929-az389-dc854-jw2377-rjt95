import React, { useState, Fragment, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete';
import LocationSelector from './LocationSelector';
import Results from './Results';
import './Search.css';

const Search = () => {
  /**
   * 
   */
  const [keywords, updateKeywords] = useState([]);
  const [location, updateLocation] = useState(-1);
  const [likes, updateLikes] = useState([]);
  const [dislikes, updateDislikes] = useState([]);
  const [results, updateResults] = useState([]);
  const [keywordsWeight, updateKeywordsWeight] = useState(1.0);
  const [likesWeight, updateLikesWeight] = useState(0.8);
  const [dislikesWeight, updateDislikesWeight] = useState(0.2);

  const [restaurants, updateRestaurants] = useState({});
  const [terms, updateTerms] = useState({});
  const [queryStatus, updateQueryStatus] = useState('empty');
  const [showAdvanced, updateShowAdvanced] = useState(false);

  const addLike = rest => {
    if (!likes.some(l => l.id === rest.id))
      updateLikes([...likes, rest]);
  }

  const removeLike = i => {
    const temp = [...likes];
    temp.splice(i, 1);
    updateLikes(temp);
  }

  const addDislike = rest => {
    if (!dislikes.some(l => l.id === rest.id))
      updateDislikes([...dislikes, rest]);
  }

  const removeDislike = i => {
    const temp = [...dislikes];
    temp.splice(i, 1);
    updateDislikes(temp);
  }

  const addKeyword = term => {
    if (!keywords.some(l => l.id === term.id))
      updateKeywords([...keywords, term]);
  }

  const removeKeyword = i => {
    const temp = [...keywords];
    temp.splice(i, 1);
    updateKeywords(temp);
  }

  const locationNames = {
    0: 'Montreal', 1: 'Las Vegas', 2: 'Phoenix', 3: 'Pittsburgh', 4: 'Toronto',
    5: 'Cleveland', 6: 'Calgary', 7: 'Charlotte', 8: 'Madison', 9: 'Danville'
  };

  useEffect(() => {
    const loadRestaurants = async () => {
      let f = await fetch(`${window.location}restaurants`);
      let temp = await f.json();
      for (let [city, rests] of Object.entries(temp)) {
        const new_rests = rests.map((r, i) => ({ 'name': r, 'id': i }));
        temp[city] = new_rests;
      }
      updateRestaurants(temp);
    };

    const loadTerms = async () => {
      let f = await fetch(`${window.location}terms`);
      let temp = await f.json();
      for (let [city, terms] of Object.entries(temp)) {
        const new_terms = terms.map((t, i) => ({ 'name': t, 'id': i }));
        temp[city] = new_terms;
      }
      updateTerms(temp);
    }
    try {
      loadRestaurants();
      loadTerms();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const buildQueryURLFromState = (currKeywords, currLocation) => {
    let baseURL = `${window.location}search`;
    let keywordsString = currKeywords.map(obj => obj['name']).toString().replace(/ /g, '%20');
    let locString = `${locationNames[currLocation]}`;
    let likesString = likes.map(obj => obj['name']).toString().replace(/ /g, '%20');
    let dislikesString = dislikes.map(obj => obj['name']).toString().replace(/ /g, '%20');

    baseURL += `${(currKeywords.length ? '?keywords=' + keywordsString : '')}`;
    if (currLocation >= 0)
      baseURL += `${(currKeywords.length ? '&' : '?')}location=${locString}`;
    if (likes.length)
      baseURL += `&likes=${likesString}`;
    if (dislikes.length)
      baseURL += `&dislikes=${dislikesString}`;

    return baseURL;
  };

  const queryAPI = async () => {
    if (keywords.length > 0 || location >= 0) {
      try {
        const queryURL = buildQueryURLFromState(keywords, location);
        console.log(queryURL);
        let response = await (fetch(queryURL, { method: 'GET' }));
        console.log(response);
        let json = await (response.json());
        console.log(json);
        let resultRestaurants = json.data.results;
        await queryYelpAPI(resultRestaurants);
        updateQueryStatus('complete');
      } catch (error) {
        console.error(error);
        updateQueryStatus('error');
      }
    }
  };

  const queryYelpAPI = async (restaurants) => {
    for (let i = 0; i < restaurants.length; i++) {
      let id = restaurants[i].id;
      let query_url = `${window.location}yelp?id=${id}`;
      let response = await (fetch(query_url, { method: 'GET' }));
      console.log(response);
      let yelp_data = await (response.json());
      console.log(yelp_data);
      restaurants[i].url = yelp_data.url;
      restaurants[i].yelp_rating = yelp_data.rating;
      if (yelp_data.location) {
        restaurants[i].location = yelp_data.location.city;
      }
      restaurants[i].image_url = yelp_data.image_url;
    }
    console.log(restaurants);
    updateResults(restaurants);
  }

  const formSubmit = e => {
    updateQueryStatus('loading');
    updateResults([]);
    queryAPI();
    e.preventDefault(e);
  }

  return (
    <Fragment>
      <form autoComplete='off' className='search-area' onSubmit={formSubmit}>
        <div className='form-row-1'>
          <div className='location-selector'>
            <LocationSelector
              locations={Object.entries(locationNames)}
              location={location}
              setLocation={l => (l === '') ? -1 : updateLocation(l)}
            />
          </div>
          <div className='keyword-search'>
            <ReactTags
              tags={keywords}
              suggestions={location >= 0 ? terms[locationNames[location]] : []}
              handleAddition={addKeyword}
              handleDelete={removeKeyword}
              placeholder={'Enter some keywords...'} />
          </div>
          <button className='submit' type='submit'>Search!</button>
        </div>
        <div className='form-row-2'>
          <div className='input-restaurant likes'>
            <ReactTags
              tags={likes}
              suggestions={location >= 0 ? restaurants[locationNames[location]] : []}
              handleAddition={addLike}
              handleDelete={removeLike}
              placeholder={likes.length ? '' : 'Enter restaurants you like...'}
            />
          </div>
          <div className='input-restaurant dislikes'>
            <ReactTags
              tags={dislikes}
              suggestions={location >= 0 ? restaurants[locationNames[location]] : []}
              handleAddition={addDislike}
              handleDelete={removeDislike}
              placeholder={dislikes.length ? '' : 'Enter restaurants you don\'t like...'}
            />
          </div>
        </div>
        <div className='form-row-3'>
          <button className='toggle-advanced-search' type="button" onClick={() => updateShowAdvanced(!showAdvanced)}>Toggle Advanced Search...</button>
          {showAdvanced && <div className='advanced-search' id='advanced-search'>
            <div className='keywords-range-container'>
              <input type="range" id="keywords-range" name="keywords-range" min={0.0} max={1.0} value={keywordsWeight} step={0.1} onChange={(e) => updateKeywordsWeight(e.target.value)}></input>
              <label htmlFor="keywords-range">Keywords: {keywordsWeight}</label>
            </div>
            <div className='likes-range-container'>
              <input type="range" id="likes-range" name="likes-range" min={0.0} max={1.0} value={likesWeight} step={0.1} onChange={(e) => updateLikesWeight(e.target.value)}></input>
              <label htmlFor="likes-range">Likes: {likesWeight}</label>
            </div>
            <div className='dislikes-range-container'>
              <input type="range" id="dislikes-range" name="dislikes-range" min={0.0} max={1.0} value={dislikesWeight} step={0.1} onChange={(e) => updateDislikesWeight(e.target.value)}></input>
              <label htmlFor="dislikes-range">Dislikes: {dislikesWeight}</label>
            </div>
          </div>}
        </div>
      </form>
      <div className='results-area'>
        {queryStatus !== 'empty' && <Results results={results} status={queryStatus} />}
      </div>
    </Fragment >
  );
}

export default Search;
