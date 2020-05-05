import React from "react";
/**
 * Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
 */
import { ReactComponent as Gem } from '../gem.svg';
import "./ResultCard.css";

const ResultCard = ({ name, isGem, score, rating, url, image_url, location, keywords, categories }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="rows">
          <div className="row1">
            <div className="card-title">
              <a
                className="card-title-link"
                target="_blank"
                rel="noopener noreferrer"
                href={url}
              >
                <h5 className="card-title-text">{name}</h5>
              </a>
              {isGem && <Gem height='20px' width='20px' />}
            </div>
            <div className="card-rating">
              <h5 className="card-rating-text">Similarity: {`${(score * 100).toFixed(0)}%`} - Yelp Rating: {rating}</h5>
            </div>
          </div>
          <div className="row2">
            <div className="card-location">
              <h6 className="card-rating-text">{location}</h6>
            </div>
            <div className="card-keywords">
              <h6 className="card-keywords-text">
                {(keywords ? "Keywords: " + keywords.map(k => `'${k}'`).join(", ") : "")}
              </h6>
              <h6 className="card-categories-text">
                {(categories ? ("Categories: " + categories.join(", ")) : "")}
              </h6>
            </div>
          </div>
        </div>
        <div className="image-box">
          <img src={image_url} alt={`${name}`}></img>
          <span style={{ clear: "both" }}></span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
