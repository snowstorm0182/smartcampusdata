import * as React from 'react';
import * as PropTypes from 'prop-types';

const Quote = ({text, id, publicationId, handleUpdateQuote, handleDeleteQuote}) => <li>
  <span>{text}</span>
  <textarea
    value={text}
    onChange={(e) => handleUpdateQuote(id, 'text', e.target.value)}
  />
  <input
    type="number"
    value={publicationId}
    onChange={(e) => handleUpdateQuote(id, 'publicationId', +e.target.value)}
  />
  <button type="button" onClick={() => handleDeleteQuote(id)}>Delete</button>
</li>


Quote.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  publicationId: PropTypes.number,
  handleUpdateQuote: PropTypes.func.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired
};

export default Quote;
