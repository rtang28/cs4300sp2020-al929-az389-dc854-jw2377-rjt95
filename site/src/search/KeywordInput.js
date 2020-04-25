import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../close-icon.svg';
import './KeywordInput.css';

/**
 * Implements a text input box that displays entered phrases on the left side of the box.
 * Reference: https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a
 */
const KeywordInput = ({ keywords, handleChange, placeholderText }) => {
  let inputField = createRef();

  const inputEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
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
        {keywords.map((word, i) => {
          return (
            <li key={word}>
              {word}
              <button type='button' onClick={() => { removeWord(i) }}>
                <CloseIcon />
              </button>
            </li>
          );
        })}
        <li className='tag-input-field'>
          <input type='text'
            onKeyDown={inputEnter}
            ref={inputField}
            placeholder={keywords.length ? '' : placeholderText}>
          </input>
        </li>
      </ul>
    </div>
  );
}

KeywordInput.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired
}

export default KeywordInput;
