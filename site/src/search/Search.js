import React, { useState } from 'react';
import KeywordInput from './KeywordInput';

const Search = () => {
  const [keywords, updateKeywords] = useState([]);

  return (
    <div className='keyword-search'>
      <KeywordInput keywords={keywords} handleChange={updateKeywords}/>
    </div>
  );

}

export default Search;
