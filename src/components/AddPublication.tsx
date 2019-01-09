import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class AddPublication extends Component<any, any> {
    static propTypes = {
      handleAddPublication: PropTypes.func.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {title: '', code:'', doi:''};
    this.addPublication = this.addPublication.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addPublication() {
    this.props.handleAddPublication(this.state);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  handleChangeEvent (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (<div>
      <input name="title" type="text" value={this.state.name} onChange={(e) => this.handleChangeEvent(e)} />
      <input name="code" type="text" value={this.state.code} onChange={(e) => this.handleChangeEvent(e)} />
      <input name="doi" type="text" value={this.state.doi} onChange={(e) => this.handleChangeEvent(e)} />
      <button type="button" onClick={this.addPublication}>Add Publication</button>
    </div>);
  }
}

export default AddPublication;
