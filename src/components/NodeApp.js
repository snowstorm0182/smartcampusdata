import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

//import AddNode from './AddNode';
//import NodeList from './NodeList';

class AddNode extends Component<any, any> {
    static propTypes = {
      handleAddNode: PropTypes.func.isRequired,
      type: PropTypes.string.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {value: ''};
    this.addNode = this.addNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addNode() {
    this.props.handleAddNode(this.props.type, this.state.value);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addNode}>Add Node</button>
    </div>);
  }
}

class AddForum extends AddNode<any, any> {
  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addNode}>Add Forum</button>
    </div>);
  }
}

class AddTodo extends AddNode<any, any> {
  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addNode}>Add Todo</button>
    </div>);
  }
}

const NodeApp = ({
  todos,
  forums,
  handleUpdateNode,
  handleDeleteNode,
  handleAddNode
  }) => <div className="NodeApp">
  <div className="NodeApp-header">
    <h2>Nodes</h2>
  </div>
  <AddForum handleAddNode={handleAddNode} type='forums' />
  <AddTodo handleAddNode={handleAddNode} type='todos' />
  <h3>todos</h3>
  {todos.map((n)=>(
    <span key={n.id}>
      <span
        style={{
          color : n.done ? 'gray':'black',
        }}
        onClick={(e) => handleUpdateNode('todos', n.id, 'done', !n.done)}>
        {n.text}
      </span>&nbsp;
      <span onClick={(e) => handleDeleteNode('todos', n.id)}>
      ⌫
      </span>
    </span>
  ))}
  <h3>forums</h3>
  {forums.map((n)=>(
    <span key={n.id}>
      <span title={n.comment}>
      {n.text}
      </span>&nbsp;
      <span onClick={(e) => handleDeleteNode('forums', n.id)}>
      ⌫
      </span>&nbsp;
      <span onClick={(e) => handleUpdateNode('forums', n.id, 'open', !n.open)}>
      {n.comment ? '⇲':'✍'}
      </span>
      {
        n.open ? (
          <div>
          <label>
          <textarea
            defaultValue={n.comment}
            onBlur={(e) => handleUpdateNode('forums', n.id, 'comment', e.target.value)}
          /></label></div>
        ):null
      }
    </span>
  ))}
</div>;

NodeApp.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  handleUpdateNode: PropTypes.func.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
  handleAddNode: PropTypes.func.isRequired,
};

NodeApp.defaultProps = {
    todos: [],
    forums: [],
};

export default NodeApp;
