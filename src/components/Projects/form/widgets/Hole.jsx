import React, { PropTypes } from 'react'

import Notes from 'components/Notes'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

type Props = {
  hole: {},
  callback: Function,
  addHoleCallback: Function,
  createNote: Function
}

export class Hole extends React.Component {
  props: Props

  static propTypes = {
    hole: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    addHoleCallback: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    console.log("HOLE WILL MOUNT")
    this.setState(this.props.hole)
  }

  handleTypeChanged = (event) => {
    this.setState({ type: event.target.value },
                  () => this.props.callback(this.state))
  }

  handleDepthChanged = (event) => {
    this.setState({ depth: event.target.value },
                  () => this.props.callback(this.state))
  }

  submitNotes = (notes) => {
    console.log("Recieved notes", notes)
    this.setState({notes: notes},
                  () => this.props.callback(this.state))
  }

  render = () => (
    <Form horizontal>
      <FormGroup controlId='type'>
        <ControlLabel>Type</ControlLabel>
        <FormControl type='text'
                     placeholder='Type'
                     onChange={this.handleTypeChanged}
                     value={this.state.type}
                     autoFocus
        />
      </FormGroup>

      <FormGroup controlId='depth'>
        <ControlLabel>Depth</ControlLabel>
        <FormControl type='text'
                     placeholder='Depth'
                     onChange={this.handleDepthChanged}
                     value={this.state.depth}
        />
      </FormGroup>

      <FormGroup controlId='notes'>
        <ControlLabel>Notes</ControlLabel>
        <Notes notes={this.state.notes}
               submitCallback={this.submitNotes}
               createNote={this.props.createNote} />
      </FormGroup>

      <FormGroup controlId='addAnother'>
        <Button onClick={this.props.addHoleCallback} bsClass="btn btn-success">
          <Glyphicon glyph='plus' /> Add another hole
        </Button>
      </FormGroup>

    </Form>
  )
}
