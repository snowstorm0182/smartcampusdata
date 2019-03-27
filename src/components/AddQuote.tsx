import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class AddQuote extends Component<any, any> {
    static propTypes = {
      handleAddQuote: PropTypes.func.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {value: ''};
    this.addQuote = this.addQuote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addQuote() {
    this.props.handleAddQuote(this.state.value);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addQuote}>Add Quote</button>
    </div>);
  }
}

export default AddQuote;
