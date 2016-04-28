/* @flow */
import React, { PropTypes } from 'react'
import classes from './Notes.scss'
import { Note } from './Note'
import { shape, factory } from 'routes/Projects/modules/factory'

import Button from 'react-bootstrap/lib/Button'

// FlowType annotations
type Props = {
  notes: [],
  onUpdate: Function, // (notes)
}

export class Notes extends React.Component {
  props: Props

  static propTypes = {
    notes: PropTypes.arrayOf(shape.note).isRequired,
    onUpdate: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({ text: '' })
  }

  handleChange = (evt) => {
    this.setState({ text: evt.target.value })
  }

  handleSave = () => {
    const note = Object.assign(factory.note(), { text: this.state.text })
    const notes = this.props.notes.concat(note)
    this.props.onUpdate(notes)
    this.setState({ text: '' })
  }

  handleNoteUpdate = (noteIdx) => (note) => {
    const notes = this.props.notes.map( (n, i) => (i == noteIdx ? note : n) )
    this.props.onUpdate(notes)
  }

  handleNoteRemoval = (noteIdx) => () => {
    const notes = this.props.notes.filter((note, idx) => (noteIdx != idx))
    this.props.onUpdate(notes)
  }

  render = () => {
    let notes
    let instruction

    if (this.props.notes.length > 0) {
      notes = this.props.notes.map((note, idx) => (
        <Note key={idx}
              note={note}
              onUpdate={this.handleNoteUpdate(idx)}
              onRemove={this.handleNoteRemoval(idx)}/>
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
            onChange={this.handleChange}
            value={this.state.text}
        />
        <Button id='note-add-button' onClick={this.handleSave} bsClass='btn btn-success'>Add comment</Button>        
      </notes>
    )
  }
}

export default Notes
