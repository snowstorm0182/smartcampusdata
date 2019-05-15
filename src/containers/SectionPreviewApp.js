import { connect } from 'react-redux';

import SectionPreviewApp from '../components/SectionPreviewApp';

import {
} from '../actions';

function mapStateToProps(state) {
  const { sections } = state;
  return {
    sections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionPreviewApp);
