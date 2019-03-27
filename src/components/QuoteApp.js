import * as React from 'react';
import * as PropTypes from 'prop-types';

import AddQuote from './AddQuote';
import QuoteList from './QuoteList';

const QuoteApp = (
    {quotes, handleUpdateQuote, handleDeleteQuote, handleAddQuote}
  ) => <div className="QuoteApp">
  <div className="QuoteApp-header">
    <h2>Quotes</h2>
  </div>
  <AddQuote handleAddQuote={handleAddQuote} />
  <QuoteList
    quotes={quotes}
    handleDeleteQuote={handleDeleteQuote}
    handleUpdateQuote={handleUpdateQuote}
  />
</div>;

QuoteApp.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  handleUpdateQuote: PropTypes.func.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired,
  handleAddQuote: PropTypes.func.isRequired,
};

export default QuoteApp;
