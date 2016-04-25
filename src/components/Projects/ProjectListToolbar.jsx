/* @flow */
import React, { PropTypes } from 'react'
import classes from './Projects.scss'

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

// FlowType annotations
type Props = {
  createCallback: Function
}

export class ProjectListToolbar extends React.Component {
  props: Props

  static propTypes = {
    createCallback: PropTypes.func.isRequired
  }

  create = () => this.props.createCallback()
  
  render() {
    return (
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.create}><Glyphicon glyph='plus' /> Create project</Button>
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}

export default ProjectListToolbar
