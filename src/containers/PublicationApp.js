import { connect } from 'react-redux';

import PublicationApp from '../components/PublicationApp';

import {
  showPublicationAdd,
  addPublication,
  updatePublication,
  updatePublicationTitle,
  updatePublicationEdit,
  updatePublicationTags,
  updatePublicationNotes,
  deletePublication,
} from '../actions';

function mapStateToProps(state) {
  const { publications, labels, quotes, visibility } = state;
  return {
    publications,
    labels,
    quotes,
    visibility
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleVisibilityUpdatePublicationAdd(value) {
      dispatch(showPublicationAdd(value));
    },
    handleAddPublication(title) {
      dispatch(addPublication(title));
    },
    handleDeletePublication(id) {
      dispatch(deletePublication(id));
    },
    handleUpdatePublication(id, done) {
      dispatch(updatePublication(id, done));
    },
    handleUpdatePublicationTitle(id, title) {
      dispatch(updatePublicationTitle(id, title));
    },
    handleUpdatePublicationEdit(id, edit) {
      dispatch(updatePublicationEdit(id, edit));
    },
    handleUpdatePublicationTags(id, tags) {
      dispatch(updatePublicationTags(id, tags));
    },
    handleUpdatePublicationNotes(id, notes) {
      dispatch(updatePublicationNotes(id, notes));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicationApp);
