import * as React from 'react';
import * as PropTypes from 'prop-types';

import Quote from './Quote';

const QuoteList = ({quotes, handleUpdateQuote, handleDeleteQuote}) => <ul>
  {
  quotes.map((quote) => <Quote
    key={quote.id}
    {...quote}
    handleDeleteQuote={handleDeleteQuote}
    handleUpdateQuote={handleUpdateQuote}
  />)}
</ul>;

QuoteList.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    id: PropTypes.number.isRequired,
    publicationId: PropTypes.number,
  })),
  handleUpdateQuote: PropTypes.func.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired
};

export default QuoteList;
