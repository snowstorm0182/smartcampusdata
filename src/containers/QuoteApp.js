import { connect } from 'react-redux';

import QuoteApp from '../components/QuoteApp';

import {
  addQuote,
  updateQuote,
  deleteQuote,
} from '../actions';

function mapStateToProps(state) {
  const { quotes } = state;
  return {
    quotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddQuote(text) {
      dispatch(addQuote(text));
    },
    handleDeleteQuote(id) {
      dispatch(deleteQuote(id));
    },
    handleUpdateQuote(id, key, val) {
      dispatch(updateQuote(id, key, val));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteApp);
