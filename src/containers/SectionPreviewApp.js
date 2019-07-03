import { connect } from 'react-redux';

import SectionPreviewApp from '../components/SectionPreviewApp';

import {
} from '../actions';

function mapStateToProps(state) {
  const { publications, sections } = state;
  return {
    publications,
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
