import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.label}</h5>
          <h3 className="card-text">{props.count}</h3>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string,
};

export default Card;
