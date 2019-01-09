import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class AddLabel extends Component<any, any> {
    static propTypes = {
      handleAddLabel: PropTypes.func.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {value: ''};
    this.addLabel = this.addLabel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addLabel() {
    this.props.handleAddLabel(this.state.value);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addLabel}>Add Label</button>
    </div>);
  }
}

export default AddLabel;
