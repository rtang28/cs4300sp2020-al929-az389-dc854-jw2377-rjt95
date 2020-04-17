import React, { Component } from 'react';

/**
 * Implements a text input box that displays entered phrases on the left side of the box.
 * Reference: https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a
 */
export default class KeywordInput extends Component {
  constructor() {
    super();
    this.state = { keywords: [] };
  }

  inputEnter = e => {
    const keyword = e.target.value.toLowerCase();
    if (e.key === 'Enter' && keyword) {
      if (!this.state.keywords.includes(keyword)) {
        this.setState({ keywords: [...this.state.keywords, keyword]});
        this.inputField.value = '';
      }
    }
    else if (e.key === 'Backspace' && !keyword) {
      this.removeWord(this.state.keywords.length - 1);
    }
  }

  removeWord = index => {
    const keywordsCopy = [...this.state.keywords];
    keywordsCopy.splice(index, 1);
    this.setState({ keywords: keywordsCopy });
    console.log(this.state);
  }

  render() {
    return (
      <div className='tag-input'>
        <ul className='tag-list'>
          { this.state.keywords.map((word, i) => {
              return (
                <li key={word}>
                  {word}
                  <button type='button' onClick={() => { this.removeWord(i) }}>x</button>
                </li>
              );
            })}
          <li className='tag-input-field'>
            <input type='text'
                   onKeyUp={this.inputEnter}
                   ref={r => { this.inputField = r; } }
                   placeholder={this.state.keywords.length ? '' : 'Enter some keywords...'}>
            </input>
          </li>
        </ul>
      </div>
    );
  }
}
