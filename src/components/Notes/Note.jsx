import React, { PropTypes } from 'react'
import update from 'react/lib/update'
import classes from './Note.scss'
import Media from 'react-bootstrap/lib/Media'
import MediaLeft from 'react-bootstrap/lib/MediaLeft'
import MediaBody from 'react-bootstrap/lib/MediaBody'
import MediaHeading from 'react-bootstrap/lib/MediaHeading'

type Props = {
  note: {},
  onUpdate: Function,
  onRemove: Function,
}

export class Note extends React.Component {
  props: Props

  static propTypes = {
    note: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({ editing: false, note: this.props.note })
  }

  setEditing = () => (
    this.setState({ editing: true })
  )

  handleChange = (evt) => {
    let newNote = update(this.state.note, { text: {$set: evt.target.value} })
    this.setState({ note: newNote })
  }

  handleSave = (evt) => {
    this.setState({ editing: false })
    this.props.onUpdate(this.state.note)
  }

  render = () => {
    let textParagraph
    let textArea
    let saveButton
    let editButton
    let removeButton

    if (this.state.editing) {
      textArea = <textarea id='note-text' value={this.state.note.text} onChange={this.handleChange}/>
      saveButton = <button id='save-button' onClick={this.handleSave}>Save</button>
    } else {
      textParagraph = <p id='note-text'>{this.props.note.text}</p>
      editButton = <button id='edit-button' onClick={this.setEditing}>Edit</button>
      removeButton = <button id='remove-button' onClick={this.props.onRemove}>Remove</button>
    }

    return (
      <note>
        <Media>
          <Media.Left>
            <img src='http://lorempixel.com/50/50/people/6'/>
          </Media.Left>
          <Media.Body>
            <Media.Heading className={classes.noteHeading}>
              <p id='note-username'>{this.props.note.username}</p>
              {removeButton}
              {editButton}
            </Media.Heading>
            {textParagraph}
            {textArea}
            {saveButton}
            <p id='note-timestamp' className={classes.noteTimestamp}>
              {this.props.note.timestamp}
            </p>
          </Media.Body>
        </Media>
      </note>
    )
  }
}

export default Note
