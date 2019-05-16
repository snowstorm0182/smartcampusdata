import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
var CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/markdown/markdown');

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

class AddSection extends AddNode<any, any> {
  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
      <button type="button" onClick={this.addNode}>Add Section</button>
    </div>);
  }
}

const SectionApp = ({
  sections,
  handleUpdateNode,
  handleDeleteNode,
  handleAddNode
  }) => <div className="NodeApp">
  <h3>Sections</h3>
  <AddSection handleAddNode={handleAddNode} type='sections' />
  {sections.sort((a, b)=> a.weight - b.weight).map((n)=>(
    <span key={n.id}
    style={{display: 'block', overflow:'hidden'}}>
    <span onClick={(e) => handleUpdateNode('sections', n.id, 'weight', (n.weight || 0) +1)}
    style={{float: 'left'}}>
    ▼
    </span>
    <span onClick={(e) => handleUpdateNode('sections', n.id, 'weight', (n.weight || 0) -1)}
    style={{float: 'left'}}>
    ▲{n.weight}
    </span>
      <span title={n.content}
      style={{    maxWidth: '19vw',
    display: 'inline-block'}}>
      {n.open ? (<input type="text" defaultValue={n.text} onBlur={(e) => handleUpdateNode('sections', n.id, 'text', e.target.value)} />) : n.text}
      </span>&nbsp;
      <span onClick={(e) => handleDeleteNode('sections', n.id)}
      >
      ⌫
      </span>&nbsp;
      <span onClick={(e) => handleUpdateNode('sections', n.id, 'open', !n.open)}
      style={{float: 'right', marginRight: '1em'}}>
      {n.content ? '⇲':'✍'}
      </span>
      {
        n.open ? (
          <div>
        		<CodeMirror value={n.content}
            onChange={(e) => handleUpdateNode('sections', n.id, 'content', e)}
            options={{
              lineNumbers: true,
              mode: 'markdown',
            }} />
          </div>
        ):null
      }
    </span>
  ))}
</div>;

SectionApp.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  handleUpdateNode: PropTypes.func.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
  handleAddNode: PropTypes.func.isRequired,
};

SectionApp.defaultProps = {
    sections: [],
};

export default SectionApp;
