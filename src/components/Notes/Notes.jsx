/* @flow */
import React, { PropTypes } from 'react'
import classes from './Notes.scss'

import Well from 'react-bootstrap/lib/Well'
import FormControl from 'react-bootstrap/lib/FormControl'
import Media from 'react-bootstrap/lib/Media'
import MediaLeft from 'react-bootstrap/lib/MediaLeft'
import MediaBody from 'react-bootstrap/lib/MediaBody'
import MediaHeading from 'react-bootstrap/lib/MediaHeading'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Button from 'react-bootstrap/lib/Button'

// FlowType annotations
type Props = {
  notes: [],
  createNote: Function,
  submitCallback: Function,

}

export class Notes extends React.Component {
  props: Props

  static propTypes = {
    notes: PropTypes.array.isRequired,
    createNote: PropTypes.func.isRequired,
    submitCallback: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    console.log("NOTES WILL MOUNT", this.props.notes)
    this.setState({
      text: '',
      valid: false,
      notes: this.props.notes
    })
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
      valid: this.state.text.length > 5
    })
  }

  submitNote = () => {
    if (this.state.valid) {
      let notes = this.state.notes.concat(Object.assign(this.props.createNote(), {text: this.state.text}))
      this.setState({notes}, () => this.props.submitCallback(notes))
    }
  }

  renderForm = () => (
    <div>
      <textarea
        className={classes.commentTextarea}
        type='text'
        placeholder='Add notes (press Enter to save) ...'
        onChange={this.handleChange}
        value={this.state.text}
     />
      <Button onClick={this.submitNote} bsClass='btn btn-success'>Add comment</Button>
    </div>
  )

  renderNotes = () => {
    if (this.state.notes.length > 0) {
      return this.state.notes.map((note, idx) => (
        <Media key={idx}>
          <Media.Left>
            <img src='http://lorempixel.com/50/50/people/6'/>
          </Media.Left>
          <Media.Body>
            <Media.Heading className={classes.noteHeading}>
              Username
            </Media.Heading>
            <p className={classes.noteContent}>
              {note.text}
            </p>
            <p className={classes.noteTimestamp}>
              {note.timestamp}
            </p>
          </Media.Body>
        </Media>
      ))
    } else {
      return (
        <Media>
          <Media.Body>
            <p className={classes.noteContent}>
              There are no notes to display. You can add one now
            </p>
          </Media.Body>
        </Media>
      )
    }
  }

  render = () => (
    <div>
      {this.renderNotes()}
      {this.renderForm()}
    </div>
	)
}

export default Notes
