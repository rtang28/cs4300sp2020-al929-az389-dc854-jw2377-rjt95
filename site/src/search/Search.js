import React, {Component} from 'react';
import TagInput from './TagInput';

export default class Search extends Component {

  render() {
    return (
      <div className='keyword-search'>
        <TagInput />
      </div>
    );
  }
}
