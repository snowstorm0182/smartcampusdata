import * as React from 'react';
import * as PropTypes from 'prop-types';
//import Select from 'react-select';

const Publication = (
    {title, id, tags, notes = [""], labels, done, toggleEdit = true, handleUpdatePublicationTitle, handleUpdatePublicationTags, handleUpdatePublicationNotes, handleTogglePublication, handleDeletePublication}
  ) => {
    function handleToggleNameEdit(toggle) {
      alert('tetst');
      toggleEdit = toggle;
    };

    function _handleUpdatePublicationNotes(id, nth, newValue){
      let newNotes : any[] = []
      notes.forEach(function(val,idx) {
         nth==idx ? newNotes.push(newValue) : newNotes.push(val)
      })
      handleUpdatePublicationNotes(id, newNotes)
    }

    function _handleDeletePublicationNote(id, nth){
      let newNotes : any[] = []
      notes.forEach(function(val,idx) {
         if(nth!=idx){newNotes.push(val)}
      })
      handleUpdatePublicationNotes(id, newNotes)
    }

    function _handleAddPublicationNote(id){
      handleUpdatePublicationNotes(id, [...notes, [""]])
    }

    return (<li>
  <h3 onClick={(e) => handleToggleNameEdit(!toggleEdit)}>{title}</h3>
  {(toggleEdit ? (<input
    name="title"
    type="text"
    value={title}
    onChange={(e) => handleUpdatePublicationTitle(id, e.target.value)}
  />):null)}
  <input
    name="done"
    type="checkbox"
    checked={done}
    onChange={(e) => handleTogglePublication(id, !done)}
  />
  <div><h4>Notes:</h4>
  {notes.map((i, idx) => (
    <span>
    <textarea key={idx} value={i} onChange={(e) => _handleUpdatePublicationNotes(id, idx, e.target.value)} />
    <input type="checkbox" onChange={(e) => _handleDeletePublicationNote(id, idx)} />
    </span>
  ))}
  <button type="button" onClick={() =>  _handleAddPublicationNote(id)}>Add note</button></div>
  <select
    name="tags"
    value={tags}
    multiple
    onChange={(e) =>  handleUpdatePublicationTags(id, [].filter.call(e.target.options, o => o.selected).map(o => o.value))}>
    {labels.map((i) => (<option key={i.id} value={i.id} selected={tags && tags.includes(i.id)}>{i.title}</option>))}
  </select>
  <button type="button" onClick={() => handleDeletePublication(id)}>Delete</button>
</li>)
}

/*
onChange={(e) => handleSelectPublicationLabel(id, e.target.value)}
<Select
      value={tags}
      onChange={(e) => handleSelectPublicationLabel(id, e.target.value)}
      options={labels}
    />
*/

Publication.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.array,
  notes: PropTypes.array,
  labels: PropTypes.array,
  done: PropTypes.bool,
  toggleEdit: PropTypes.bool,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleTogglePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired
};

export default Publication;
