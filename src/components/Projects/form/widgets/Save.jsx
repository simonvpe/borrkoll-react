import React, { PropTypes } from 'react'

import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Button from 'react-bootstrap/lib/Button'

type Props = {
  onSubmit: Function
}

export class Save extends React.Component {
  props: Props

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render = () => (
    <Form horizontal>
      <p>Please review all of the steps before saving.</p>
      <p>You can always go back and make changes if you for some reason made a mistake.</p>
      <FormGroup>
        <Button onClick={this.props.onSubmit} bsClass='btn btn-success'>Save</Button>
      </FormGroup>
    </Form>
  )
}
