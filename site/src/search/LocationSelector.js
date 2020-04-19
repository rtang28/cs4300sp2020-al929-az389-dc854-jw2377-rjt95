import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import '../index.css';

/**
 * Implements a dropdown menu that selects locations. Uses a hook to
 * update the state in Search.js to reflect this selection.
 * Loosely based off this: https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
 */
const LocationSelector = ({ locations, setSelected }) => {
    const [listOpen, setListOpen] = useState(false);
    const [header, setHeader] = useState("Choose Location...");
    /**
     * Clicking outside dropdown calls closeList
     */
    useEffect(() => {
        setTimeout(() => {

            if (listOpen) {
                window.addEventListener('click', closeList)
            }
            else {
                window.removeEventListener('click', closeList)
            }
        }, 0);
        /**
         * No memory leaks here!
         */
        return function cleanup() {
            window.removeEventListener('click', closeList)
        }
    });

    const closeList = () => {
        setListOpen(false);
    };

    const toggleList = () => {
        setListOpen(!listOpen);
    };

    const handleSelect = (id) => {
        setSelected(id);
        closeList();
        setHeader(locations[id].title);
    };


    return (
        <div className="dd-wrapper">
            <div className="dd-header" onClick={() => toggleList()}>
                <div className="dd-header-title">{header}</div>
                {listOpen
                    ? <FontAwesome name="angle-up" size="2x" />
                    : <FontAwesome name="angle-down" size="2x" />
                }
            </div>
            {listOpen && <ul className="dd-list">
                {
                    locations.map((item) => (
                        <li key={item.id} className="dd-list-item" onClick={() => handleSelect(item.id)}>{item.title}</li>
                    ))
                }
            </ul>}
        </div >
    )
}

export default LocationSelector;