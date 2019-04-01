import * as React from 'react';
import * as PropTypes from 'prop-types';

const Quote = ({text, id, comment, type, publicationId, handleUpdateQuote, handleDeleteQuote}) => <li>
  <label>Quote
  <textarea
    value={text}
    onChange={(e) => handleUpdateQuote(id, 'text', e.target.value)}
  /></label>
  <label>Comment
  <textarea
    value={comment}
    onChange={(e) => handleUpdateQuote(id, 'comment', e.target.value)}
  /></label>
  <label>Type
  <textarea
    value={type}
    onChange={(e) => handleUpdateQuote(id, 'type', e.target.value)}
  /></label>
  <label>Publication
  <input
    type="number"
    style={{width : '3.5em'}}
    value={publicationId}
    onChange={(e) => handleUpdateQuote(id, 'publicationId', +e.target.value)}
  /></label>
  <button type="button" onClick={() => handleDeleteQuote(id)}>Delete</button>
</li>


Quote.propTypes = {
  text: PropTypes.string.isRequired,
  comment: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.number.isRequired,
  publicationId: PropTypes.number,
  handleUpdateQuote: PropTypes.func.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired
};

export default Quote;
