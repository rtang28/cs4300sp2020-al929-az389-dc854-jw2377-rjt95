import React from 'react';
import './AdvancedSearch.css';

const AdvancedSearch = ({ keywordsWeight, likesWeight, dislikesWeight, updateKeywordsWeight, updateLikesWeight, updateDislikesWeight }) => {
  return (
    <div className='advanced-search' id='advanced-search'>
      <div className='advanced-search-title'>
        <b>Adjust Importance of Each Input</b>
      </div>
      <div className='slider'>
        <input type="range" id="keywords-range" className="range" min={0.0} max={1.0} value={keywordsWeight} step={0.1} onChange={(e) => updateKeywordsWeight(e.target.value)}></input>
        <label htmlFor="keywords-range"> Keywords: {keywordsWeight}</label>
      </div>
      <div className='slider'>
        <input type="range" id="likes-range" className="range" min={0.0} max={1.0} value={likesWeight} step={0.1} onChange={(e) => updateLikesWeight(e.target.value)}></input>
        <label htmlFor="likes-range"> Likes: {likesWeight}</label>
      </div>
      <div className='slider'>
        <input type="range" id="dislikes-range" className="range" min={0.0} max={1.0} value={dislikesWeight} step={0.1} onChange={(e) => updateDislikesWeight(e.target.value)}></input>
        <label htmlFor="dislikes-range"> Dislikes: {dislikesWeight}</label>
      </div>
    </div>
  );
};

export default AdvancedSearch;
