import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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
          <h3>Searching for eateries</h3>

        </div>
      </div>
    </div>
  );
}

HelpBox.propTypes = {
  updateShow: PropTypes.func.isRequired
};

export default HelpBox;
