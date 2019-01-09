import * as React from 'react';
import * as PropTypes from 'prop-types';

import Label from './Label';

const LabelList = ({labels, handleUpdateLabel, handleDeleteLabel}) => <ul>
  {labels.map((label) => <Label
    key={label.id}
    {...label}
    handleDeleteLabel={handleDeleteLabel}
    handleUpdateLabel={handleUpdateLabel}
  />)}
</ul>;

LabelList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  handleUpdateLabel: PropTypes.func.isRequired,
  handleDeleteLabel: PropTypes.func.isRequired
};

export default LabelList;
