import * as React from 'react';
import * as PropTypes from 'prop-types';

import AddLabel from './AddLabel';
import LabelList from './LabelList';

const LabelApp = (
    {labels, handleUpdateLabel, handleDeleteLabel, handleAddLabel}
  ) => <div className="LabelApp">
  <div className="LabelApp-header">
    <h2>Labels</h2>
  </div>
  <AddLabel handleAddLabel={handleAddLabel} />
  <LabelList
    labels={labels}
    handleDeleteLabel={handleDeleteLabel}
    handleUpdateLabel={handleUpdateLabel}
  />
</div>;

LabelApp.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  handleUpdateLabel: PropTypes.func.isRequired,
  handleDeleteLabel: PropTypes.func.isRequired,
  handleAddLabel: PropTypes.func.isRequired,
};

export default LabelApp;
