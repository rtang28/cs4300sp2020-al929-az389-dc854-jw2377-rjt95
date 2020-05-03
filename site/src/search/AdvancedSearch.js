import React from 'react';
import './AdvancedSearch.css';

const AdvancedSearch = ({ keywordsWeight, likesWeight, dislikesWeight, updateKeywordsWeight, updateLikesWeight, updateDislikesWeight }) => {
  return (
    <div className='advanced-search' id='advanced-search'>
      <div className='advanced-search-title'>
        <b>Adjust Importance of Each Input</b>
      </div>
      <div className='slider'>
        <input type="range" id="keywords-range" className="range" min={0} max={10} value={keywordsWeight * 10} step={1} onChange={(e) => updateKeywordsWeight(e.target.value / 10)}></input>
        <label htmlFor="keywords-range"> Keywords: {keywordsWeight * 10}</label>
      </div>
      <div className='slider'>
        <input type="range" id="likes-range" className="range" min={0} max={10} value={likesWeight * 10} step={1} onChange={(e) => updateLikesWeight(e.target.value / 10)}></input>
        <label htmlFor="likes-range"> Likes: {likesWeight * 10}</label>
      </div>
      <div className='slider'>
        <input type="range" id="dislikes-range" className="range" min={0} max={10} value={dislikesWeight * 10} step={1} onChange={(e) => updateDislikesWeight(e.target.value / 10)}></input>
        <label htmlFor="dislikes-range"> Dislikes: {dislikesWeight * 10}</label>
      </div>
    </div>
  );
};

export default AdvancedSearch;
