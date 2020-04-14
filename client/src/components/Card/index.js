import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Card.css';

export function Card({
  name, rarity, type, subtypes, cost, power, health, set, text, imageUrl
}) {
  return (
    <div className="card">
      <div className="card__image">
        <LazyLoadImage
          alt={name}
          height={580}
          src={imageUrl}
          width={350}
        />
      </div>
      <div className="card__details">
        <div className="card__name">{name}</div>
        <div className="card__rarity">{rarity}</div>
        <div className="card__type">
          {type} &mdash;&nbsp;
          <span className="card__stats">
            {cost} mana{health && <span className="card__power-health">&nbsp;{`${power}/${health}`}</span>}
          </span>
          {subtypes && (
            <span className="card__subtypes">&nbsp;{subtypes.join(', ')}</span>
          )}
        </div>
        <div className="card_set">{set.name}</div>
        <div className="card_text">{text}</div>
      </div>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  rarity: PropTypes.string,
  type: PropTypes.string,
  subtypes: PropTypes.arrayOf(PropTypes.string),
  cost: PropTypes.number,
  power: PropTypes.number,
  health: PropTypes.number,
  set: PropTypes.string,
  text: PropTypes.string,
  imageUrl: PropTypes.string
};
