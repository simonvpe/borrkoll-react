import React from 'react'

import Col from 'react-bootstrap/lib/Col'

import classes from './ProjectListHeader.scss'

export class ProjectListHeader extends React.Component {
  render = () => (
    <Col xs={12} className={classes.header}>
      <Col sm={2} smOffset={1}><h4>#</h4></Col>
      <Col sm={3}><h4>Site</h4></Col>
      <Col sm={3}><h4>Customer</h4></Col>
      <Col sm={1}><h4>Holes #</h4></Col>
      <Col sm={2}/>
    </Col>
  )
}

export default ProjectListHeader
