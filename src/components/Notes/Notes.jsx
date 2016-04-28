/* @flow */
import React, { PropTypes } from 'react'
import classes from './Notes.scss'
import { Note } from './Note'
import { factory } from 'routes/Projects/modules/factory'
import Button from 'react-bootstrap/lib/Button'

// FlowType annotations
type Props = {
  notes: [],
  onUpdate: Function, // (notes)
}

export class Notes extends React.Component {
  props: Props

  static propTypes = {
    notes: PropTypes.arrayOf(Object).isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({ text: '' })
  }

  onChange = (evt) => {
    this.setState({ text: evt.target.value })
  }

  handleSave = () => {
    const note = Object.assign(factory.note(), {
      text: this.state.text,
    })
    const notes = this.props.notes.concat(note)
    this.props.onUpdate(notes)
    this.setState({ text: '' })
  }

  onUpdateNote = (noteIdx) => (note) => {
    const notes = this.props.notes.map( (n, i) => (i === noteIdx ? note : n) )
    this.props.onUpdate(notes)
  }

  onRemoveNote = (noteIdx) => () => {
    const notes = this.props.notes.filter((note, idx) => (noteIdx !== idx))
    this.props.onUpdate(notes)
  }

  render = () => {
    let notes
    let instruction

    if (this.props.notes.length > 0) {
      notes = this.props.notes.map((note, idx) => (
        <Note key={idx}
              note={note}
              onUpdate={this.onUpdateNote(idx)}
              onRemove={this.onRemoveNote(idx)}/>
      ))
    } else {
      instruction = <p id='note-add-instruction'>There are no notes yet...</p>
    }

    return (
      <notes>
        {instruction}
        {notes}
        <textarea
            id='note-add-text'
            className={classes.commentTextarea}
            type='text'
            placeholder='Add notes (press Enter to save) ...'
            onChange={this.onChange}
            value={this.state.text}
        />
        <Button id='note-add-button' onClick={this.handleSave} bsClass='btn btn-success'>Add comment</Button>        
      </notes>
    )
  }
}

export default Notes
