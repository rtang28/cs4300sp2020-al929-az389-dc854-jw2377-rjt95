import React, { createRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Implements a text input box that displays entered phrases on the left side of the box.
 * Reference: https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a
 */
const KeywordInput = ({ keywords, handleChange }) => {
  let inputField = createRef();

  const inputEnter = e => {
    const keyword = e.target.value.toLowerCase();
    if (e.key === 'Enter' && keyword) {
      if (!keywords.includes(keyword)) {
        handleChange([...keywords, keyword]);
        inputField.current.value = '';
      }
    }
    else if (e.key === 'Backspace' && !keyword) {
      removeWord(keywords.length - 1);
    }
  }

  const removeWord = index => {
    const keywordsCopy = [...keywords];
    keywordsCopy.splice(index, 1);
    handleChange(keywordsCopy);
  }

  // console.log(this.props);
  return (
    <div className='tag-input'>
      <ul className='tag-list'>
        { keywords.map((word, i) => {
            return (
              <li key={word}>
                {word}
                <button type='button' onClick={() => { removeWord(i) }}>x</button>
              </li>
            );
          })}
        <li className='tag-input-field'>
          <input type='text'
                  onKeyUp={inputEnter}
                  ref={inputField}
                  placeholder={keywords.length ? '' : 'Enter some keywords...'}>
          </input>
        </li>
      </ul>
    </div>
  );
}

KeywordInput.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default KeywordInput;
