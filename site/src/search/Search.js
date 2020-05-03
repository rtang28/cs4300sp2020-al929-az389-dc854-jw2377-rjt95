import React, { useState, Fragment, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete';
import LocationSelector from './LocationSelector';
import Results from './Results';
import './Search.css';
import './ReactTags.css';

const Search = () => {
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
    0: 'Montreal, QC', 1: 'Las Vegas, NV', 2: 'Phoenix, AZ', 3: 'Pittsburgh, PA', 4: 'Toronto, ON',
    5: 'Cleveland, OH', 6: 'Calgary, AB', 7: 'Charlotte, NC', 8: 'Madison, WI', 9: 'Danville, IL'
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
    let locString = `${locationNames[currLocation].split(',')[0]}`;
    let likesString = likes.map(obj => obj['name']).toString().replace(/ /g, '%20');
    let dislikesString = dislikes.map(obj => obj['name']).toString().replace(/ /g, '%20');
    let weightsString;
    if (keywordsWeight !== 1.0 || likesWeight !== 0.8 || dislikesWeight !== 0.2) {
      let weightsString = [keywordsWeight, likesWeight, dislikesWeight].toString();
      console.log(weightsString);
    }

    baseURL += `${(currKeywords.length ? '?keywords=' + keywordsString : '')}`;
    if (currLocation >= 0)
      baseURL += `${(currKeywords.length ? '&' : '?')}location=${locString}`;
    if (likes.length)
      baseURL += `&likes=${likesString}`;
    if (dislikes.length)
      baseURL += `&dislikes=${dislikesString}`;
    if (weightsString)
      baseURL +=`weights=${weightsString}`;
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
              suggestions={location >= 0 ? terms[locationNames[location].split(',')[0]] : []}
              handleAddition={addKeyword}
              handleDelete={removeKeyword}
              placeholder={keywords.length ? '' : 'Enter some keywords...'} />
          </div>
          <button className='submit' type='submit'>Search!</button>
        </div>
        <div className='form-row-2'>
          <div className='input-restaurant likes'>
            <ReactTags
              tags={likes}
              suggestions={location >= 0 ? restaurants[locationNames[location].split(',')[0]] : []}
              handleAddition={addLike}
              handleDelete={removeLike}
              placeholder={likes.length ? '' : 'Enter restaurants you like...'}
            />
          </div>
          <div className='input-restaurant dislikes'>
            <ReactTags
              tags={dislikes}
              suggestions={location >= 0 ? restaurants[locationNames[location].split(',')[0]] : []}
              handleAddition={addDislike}
              handleDelete={removeDislike}
              placeholder={dislikes.length ? '' : 'Enter restaurants you don\'t like...'}
            />
          </div>
        </div>
        <div className='form-row-3'>
          <div className='advanced-search-toggle'>
            <label class="switch-box" id="switch-box">
              <input type="checkbox" onChange={() => updateShowAdvanced(!showAdvanced)}></input>
              <span class="switch"></span>
            </label>
            <label for="switch-box" id="toggle-label">Toggle Advanced Search</label>
          </div>
          {showAdvanced && <div className='advanced-search' id='advanced-search'>
            <div className='advanced-search-title'>
              <b>Adjust Importance of Each Input</b>
            </div>
            <div className='slider'>
              <input type="range" id="keywords-range" class="range" min={0.0} max={1.0} value={keywordsWeight} step={0.1} onChange={(e) => updateKeywordsWeight(e.target.value)}></input>
              <label htmlFor="keywords-range"> Keywords: {keywordsWeight}</label>
            </div>
            <div className='slider'>
              <input type="range" id="likes-range" class="range" min={0.0} max={1.0} value={likesWeight} step={0.1} onChange={(e) => updateLikesWeight(e.target.value)}></input>
              <label htmlFor="likes-range"> Likes: {likesWeight}</label>
            </div>
            <div className='slider'>
              <input type="range" id="dislikes-range" class="range" min={0.0} max={1.0} value={dislikesWeight} step={0.1} onChange={(e) => updateDislikesWeight(e.target.value)}></input>
              <label htmlFor="dislikes-range"> Dislikes: {dislikesWeight}</label>
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
