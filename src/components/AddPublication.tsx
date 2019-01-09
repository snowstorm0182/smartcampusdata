import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class AddPublication extends Component<any, any> {
    static propTypes = {
      handleAddPublication: PropTypes.func.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {value: ''};
    this.addPublication = this.addPublication.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addPublication() {
    this.props.handleAddPublication(this.state.value);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addPublication}>Add Publication</button>
    </div>);
  }
}

export default AddPublication;
