import * as React from 'react';
import * as PropTypes from 'prop-types';

const Label = ({title, id, handleUpdateLabel, handleDeleteLabel}) => <li>
  <span>{title}</span>
  <input
    type="text"
    value={title}
    onChange={(e) => handleUpdateLabel(id, e.target.value)}
  />
  <button type="button" onClick={() => handleDeleteLabel(id)}>Delete</button>
</li>


Label.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  handleDeleteLabel: PropTypes.func.isRequired
};

export default Label;
