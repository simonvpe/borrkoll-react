import React, { PropTypes } from 'react'
import update from 'react/lib/update'
import { factory } from 'routes/Projects/modules/factory'

import Notes from 'components/Notes'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

type Props = {
  hole: {},
  onUpdate: Function, // (hole) => 
  onRemove: Function, // () =>
  onCreate: Function //
}

export class Hole extends React.Component {
  props: Props

  static propTypes = {
    hole: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  }

  onUpdateType = (event) => {
    const hole = update(this.props.hole, {
      type: { $set: event.target.value }
    })
    this.props.onUpdate(hole)
  }

  onUpdateDepth = (event) => {
    const hole = update(this.props.hole, {
      depth: { $set: parseInt(event.target.value) }
    })
    this.props.onUpdate(hole)
  }

  onUpdateNotes = (notes) => {
    const hole = update(this.props.hole, {
      notes: { $set: notes }
    })
    this.props.onUpdate(hole)
  }

  onRemove = (evt) => {
    evt.preventDefault()
    this.props.onRemove()
  }

  render = () => (
    <Form horizontal>
      <Button onClick={this.onRemove}>Remove this hole</Button>
      <FormGroup controlId='type'>
        <ControlLabel>Type</ControlLabel>
        <FormControl type='text'
                     placeholder='Type'
                     onChange={this.onUpdateType}
                     value={this.props.hole.type}
                     autoFocus
        />
      </FormGroup>

      <FormGroup controlId='depth'>
        <ControlLabel>Depth</ControlLabel>
        <FormControl type='text'
                     placeholder='Depth'
                     onChange={this.onUpdateDepth}
                     value={this.props.hole.depth}
        />
      </FormGroup>

      <FormGroup controlId='notes'>
        <ControlLabel>Notes</ControlLabel>
        <Notes notes={this.props.hole.notes}
               onUpdate={this.onUpdateNotes} />
      </FormGroup>

      <FormGroup controlId='addAnother'>
        <Button onClick={this.props.onCreate} bsClass="btn btn-success">
          <Glyphicon glyph='plus' /> Add another hole
        </Button>
      </FormGroup>

    </Form>
  )
}
