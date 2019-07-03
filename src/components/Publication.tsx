import * as React from 'react';

import {STATES, WEIGHTS} from '../constants';
import {appendQuotes} from '../actions';
import db from '../db';
import Select from 'react-select';

let anyNavigator: any
anyNavigator = window.navigator

class Publication extends React.Component
  <any, any>
  {
    public static defaultProps = {
        tags: [],
        notes: [],
        forums: [],
        file: "",
    };

    constructor(props) {
      super(props);
      this.state.author = this.props.localauthor ? this.props.localauthor :
        (Object.keys(this.props.crossref).length !== 0 ?
          (this.props.crossref['author'] ?
            this.props.crossref['author'][0]['family'] : ''):
          (Object.keys(this.props.semanticscholar).length ? this.props.semanticscholar.authors[0].name : ''));
      this.state.forum = Object.keys(this.props.crossref).length !== 0 ?
        this.props.crossref['container-title'][0]:
        'preprint'
    }

    state = {
      showquotes:  false,
      showabstract:  false,
      author: '',
      forum: '',
    }

    link(){
      return this.props.arxiv ? 'https://arxiv.org/abs/'+this.props.arxiv.trim() : 'https://dx.doi.org/'+this.props.doi.trim();
    }

    file(){
      return this.props.file
    }

    handleToggleNameEdit(toggle) {
      this.props.handleUpdatePublicationEdit(this.props.id, toggle)
    }

    handleLocalAuthorLastnameUpdate(id, name) {
      this.setState(state => ({
        author: name,
      }));
      this.props.handleUpdatePublicationField(id,
        {localauthor: name}
      );
    }

    _handleUpdatePublicationNotes(id, nth, newValue){
      let newNotes : any[] = []
      this.props.notes.forEach(function(val,idx) {
         nth==idx ? newNotes.push(newValue) : newNotes.push(val)
      })
      this.props.handleUpdatePublicationNotes(id, newNotes)
    }

    _handleDeletePublicationNote(id, nth){
      let newNotes : any[] = []
      this.props.notes.forEach(function(val,idx) {
         if(nth!=idx){newNotes.push(val)}
      })
      this.props.handleUpdatePublicationNotes(id, newNotes)
    }

    _handleAddPublicationNote(id){
      this.props.handleUpdatePublicationNotes(id, [...this.props.notes, [""]])
    }

    _handleCrossRef(){
      fetch('https://api.crossref.org/works/'+this.props.doi)
        .then(result=>result.json())
        .then(items=>{console.log(items);alert(items.message['is-referenced-by-count']);})
    }

    onToggle = (e, name) => {
      this.setState(prevState => ({
        [name]: !prevState[name],
      }));
    }

    fileReader = new FileReader()
    handleQuoteFileRead = (e) => {
        const content = this.fileReader.result;
        if(typeof content !== 'string'){
          return;
        }
        (async ()=>{
          const dataToImport = JSON.parse(content);
          dataToImport.id = this.props.id
          await appendQuotes(dataToImport, db);
        })();
    }
    handleQuoteFileChosen = (file) => {
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleQuoteFileRead;
        this.fileReader.readAsText(file);
    }

    nullforums(){
      //if (!this.props.forums.includes({id:0,text:'--'}))
      return this.props.forums.concat([{id:0,text:'--'}]);
      //return this.props.forums;
    }


    render = () => {return (<li
    style={this.props.state === 'focus' ? {
      outlineOffset: '-.5em',
      padding: '.5em .5em 1em',
      outline: '3px dashed blue',
      backgroundColor:'#ffd955',
    }:(
      this.props.state === 'processed' ? {
        backgroundColor:'#e4f0f5',
        padding: '.5em .5em 1em',
      }:(
        this.props.state === 'exluded' ? {
          backgroundColor:'#f8e1e1'
        }:{padding: '.5em .5em 1em',})
    )}>
    <h3 id={'publication-'+this.props.id}><span onClick={(e) => this.handleToggleNameEdit(!this.props.edit)}
      style={{
        textDecoration : this.props.state === 'exluded' ? 'line-through':'none',
      }}
    >{this.props.title}</span><a target='_blank' href={this.link()}>&#11016;</a>
    {this.props.file !== "" ? (<a target='_blank' href={this.file()}>&#128190;</a>):null}</h3>
    <p style={{marginTop : '-1em'}}>
      <button name={'showquotes'}
        onClick={(e) => this.onToggle(e, 'showquotes')}
        style={{
          color : this.state.showquotes ? 'green':'black',
          display : this.props.quotes.filter((i) => (i.publicationId == this.props.id)).length ? 'inline-block': 'none'
        }}>Show quotes {this.props.quotes.filter((i) => (i.publicationId == this.props.id)).length}</button>&nbsp;
        <button name={'showabstract'}
          onClick={(e) => this.onToggle(e, 'showabstract')}
          style={{
            color : this.state.showabstract ? 'green':'black',
            display : this.props.abstract ? 'inline-block': 'none'
          }}>Show abstract</button>&nbsp;
        <select
          name="state"
          defaultValue={this.props.state}
          onChange={(e) =>  this.props.handleUpdatePublicationField(this.props.id, {state: e.target.value})}> // [].filter.call(e.target.options, o => o.selected).map(o => o.value))}>
          {STATES.map((i) => (<option key={i} value={i}>{i}</option>))}
        </select>&nbsp;
        <select
          name="weight"
          defaultValue={this.props.weight}
          onChange={(e) =>  this.props.handleUpdatePublicationField(this.props.id, {weight: e.target.value})}> // [].filter.call(e.target.options, o => o.selected).map(o => o.value))}>
          {WEIGHTS.map((i) => (<option key={i} value={i}>{i}</option>))}
        </select>&nbsp;
        <span
        onClick={(e) => {anyNavigator.clipboard.writeText('@pubId/'+this.props.id+'/'+this.state.author)}}>
        id:</span>
      {this.props.id + ", "}
      {
      "notes:" + (this.props.notes ? this.props.notes.length : '0')
      + ", " + this.props.labels.filter(
        (i) => (
          this.props.tags.map((t)=>parseInt(t)).includes(i.id)
        )
      ).map(
        (i) => (i.title+" ")
      ).join()
      + this.state.author + " - " + this.state.forum
    }</p>
    {(this.state.showabstract ? (
      <p
      style={{
        textAlign: 'left'
      }}
      ><strong>Abstract: </strong>{this.props.abstract}</p>
    ):null)}
    {(this.state.showquotes ? (
    <div className="quotes__item--publication">{(
      this.props.quotes.filter((i) => (i.publicationId == this.props.id)).map((i) => (
        <div key={'quotewrap-'+i.id} className="quotes__item-wrap">
          {(i.labels ? (<span>{(i.labels || "")}</span>):null)}
          <div key={'quote-'+i.id} style={{border: '1px solid darkgrey', backgroundColor: 'lightgrey', padding: '.5em'}}
            title={i.labels + "\n" + i.desc} className="quotes__item">
          {i.text}
          </div>
        </div>
      ))
    )}
    </div>
    ):null)}
    {(this.props.edit ? (<div>
    <span><label>title:<input
      name="title"
      type="text"
      value={this.props.title}
      onChange={(e) => this.props.handleUpdatePublicationTitle(this.props.id, e.target.value)}
    />;</label></span>
    <span><label>author:<input
      name="author"
      type="text"
      value={this.state.author}
      onChange={(e) => this.handleLocalAuthorLastnameUpdate(this.props.id, e.target.value)}
    />;</label></span>
    <span><label>abstract:<input
      name="abstract"
      type="text"
      value={this.props.abstract}
      onChange={(e) => this.props.handleUpdatePublicationField(this.props.id, { abstract: e.target.value })}
    />;</label></span>
    <span><label>url:<input
      name="file"
      type="text"
      value={this.props.file}
      onChange={(e) => this.props.handleUpdatePublicationField(this.props.id, { file: e.target.value })}
    />;</label></span>
    <input
      name="done"
      type="checkbox"
      checked={this.props.done}
      onChange={(e) => this.props.handleTogglePublication(this.props.id, !this.props.done)}
    />
    <div>
      <button type="button" onClick={() =>  this._handleCrossRef()}>Check Citation(1_sec_lim)</button>
      <input type='file'
             id='file'
             className='input-file'
             accept='.json'
             onChange={(e) => this.handleQuoteFileChosen(e.target.files![0])}
      />
    </div>
    <div><h4>Notes:</h4>
    {this.props.notes.map((i, idx) => (
      <span key={'span' + idx}>
      <textarea key={idx} value={i} onChange={(e) => this._handleUpdatePublicationNotes(this.props.id, idx, e.target.value)} />
      <input type="checkbox" onChange={(e) => this._handleDeletePublicationNote(this.props.id, idx)} />
      </span>
    ))}
    <button type="button" onClick={() =>  this._handleAddPublicationNote(this.props.id)}>Add note</button></div>
    <Select
        defaultValue={this.props.tags.map((i)=>(
          { id:parseInt(i), value:parseInt(i), label:(
            this.props.labels.filter((l)=>l.id === parseInt(i))[0]['title']
          )}
        ))}
        getOptionLabel={opt => opt.label}
        options={Array.from(new Set(this.props.labels))
          .sort((a, b)=> a['title'].localeCompare(b['title']))
          .map((l)=>{
            return {id:l['id'],value:l['id'],label:l['title']};
          })
        }
        {...{
          isMulti:true,
          onChange: (options) =>  {
            this.props.handleUpdatePublicationTags(this.props.id, options.map((o)=>(
              typeof o === 'object' ? o.value : o
            )))
          },
        }}
      />
    <select
      name="forum"
      defaultValue={this.props.forum}
      onChange={(e) =>  this.props.handleUpdatePublicationField(this.props.id, {forum:e.target.value})}>
      {this.nullforums()
        .sort((a, b)=> a.text.localeCompare(b.text))
        .map((i,idx) => (<option key={i.id+'forum'} value={i.id}>{i.text}</option>))}
    </select>
    <button type="button" onClick={() => this.props.handleDeletePublication(this.props.id)}>Delete</button>
  </div>):null)}</li>);
  }
}

export default Publication;
