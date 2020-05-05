import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Gem} from '../gem.svg';
import './HelpBox.css';

const HelpBox = ({ updateShow }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (contentRef.current && !contentRef.current.contains(event.target))
        updateShow(false);
    };

    document.addEventListener('click', handleOutsideClick);
    return () => { document.removeEventListener('click', handleOutsideClick) };
  }, [updateShow]);

  return (
    <div className='modal'>
      <div className='modal-content' ref={contentRef}>
        <div className="modal-header">
          <h2>Help</h2>
          <h2 className="close-modal" onClick={() => updateShow(false)}>&times;</h2>
        </div>
        <div className="modal-body">
          <h3>Locations</h3>
          <p>Currently, we support the following cities:</p>
          <ul>
            <li>Montreal, QC</li>
            <li>Las Vegas, NV</li>
            <li>Phoenix, AZ</li>
            <li>Pittsburgh, PA</li>
            <li>Toronto, ON</li>
            <li>Cleveland, OH</li>
            <li>Calgary, AB</li>
            <li>Charlotte, NC</li>
            <li>Madison, WI</li>
            <li>Danville, IL</li>
          </ul>
          <h3>Searching for eateries</h3>
          <p>
            First, choose one of our supported locations from the dropdown menu. Then you can add some keywords that best describe the eateries
            you're looking for, as well as other restaurants in the area that you like or dislike. As you start typing, suggestions should appear
            underneath the text box. Select a suggestion by either clicking on it or using up/down arrow keys and pressing ENTER.
          </p>
          <div className='gem-explanation'>
            <h3 className='gem-title'>Hidden Gems</h3>
            <Gem height='20px' width='20px'/>
          </div>
          <p className='end-help'>
            Popular eateries tend to dominate restaurant recommendation lists and steal the spotlight from other equally deserving food joints.
            We believe in helping hidden gem restaurants shine and helping adventurous food aficionados find new favorites. Results with a gem
            icon next to their names denote eateries that have good ratings but below-average counts of reviews, which we think are under-the-radar
            places worth checking out.
          </p>
        </div>
      </div>
    </div>
  );
}

HelpBox.propTypes = {
  updateShow: PropTypes.func.isRequired
};

export default HelpBox;
