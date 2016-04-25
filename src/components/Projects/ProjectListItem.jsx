/* @flow */
import React, { PropTypes } from 'react'
import classes from './ProjectListItem.scss'

import Notes from 'components/Notes'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import Col from 'react-bootstrap/lib/Col'
import Collapse from 'react-bootstrap/lib/Collapse'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

type Props = {
  project: {},
  createNote: Function,
  updateCallback: Function,
  startEditingCallback: PropTypes.func.isRequired,
  deleteCallback: Function,
}

export class ProjectListItem extends React.Component {
  props: Props

  static propTypes = {
    project: PropTypes.object.isRequired,
    createNote: PropTypes.func.isRequired,
    updateCallback: PropTypes.func.isRequired,
    startEditingCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func
  }

  constructor(...args) {
    // TODO Make componentWillMount instead
    super(...args)
    this.state = {}
  }

  openPanel = () => {
    this.setState(Object.assign({}, this.state, { open: !this.state.open } ))
  }

  submitNotes = (notes) => {
    this.props.updateCallback(Object.assign(this.props.project, { notes: notes }))
  }

  deleteProject = () => {
    this.props.deleteCallback(this.props.project._id)
  }

  editProject = () => {
    this.props.startEditingCallback(this.props.project)
  }

  render = () => (
    <div>
      <div className={'row panel panel-body ' + classes.headers}>
        <Col xs={12} sm={1}>
          <Glyphicon
              glyph={this.state.open ? 'chevron-down' : 'chevron-right'}
              onClick={this.openPanel.bind(this)}
          />
          <strong className='visible-xs-inline pull-right'>{this.props.project._id}</strong>
        </Col>
        <Col sm={2} className='hidden-xs'>{this.props.project._id}</Col>

        <strong className='visible-xs col-xs-3'>Address</strong>
        <Col sm={3} xs={9}>
          {this.props.project.site.street + ', '}<br className='visible-xs'/>
          {this.props.project.site.zipCode + ', '}
          {this.props.project.site.city + ', '}
          {this.props.project.site.country}
        </Col>

        <strong className='visible-xs col-xs-3'>Customer</strong>
        <Col sm={3} xs={9}>
          {this.props.project.customer.firstName + ' '}
          {this.props.project.customer.lastName + ' '}<br className='visible-xs'/>
          {this.props.project.customer.street + ', '}<br className='visible-xs'/>
          {this.props.project.customer.zipCode + ', '}
          {this.props.project.customer.city + ', '}
          {this.props.project.customer.country}
        </Col>

        <strong className='visible-xs col-xs-3'>Holes#</strong>
        <Col sm={1} xs={9}>{this.props.project.holes ? this.props.project.holes.length : 0}</Col>

        <Col sm={2} xs={9}>
          <DropdownButton title='Actions' id='actions'>
            <MenuItem eventKey='1' onClick={this.deleteProject.bind(this)}>
              <Glyphicon glyph='remove' /> Delete
            </MenuItem>
            <MenuItem eventKey='2' onClick={this.editProject}>
              <Glyphicon glyph='edit' /> Edit
            </MenuItem>            
          </DropdownButton>
        </Col>
      </div>

      <Collapse in={this.state.open}>
        <Col smOffset={1}>
          {/* Hole table */}
          <Table condensed className={classes.holeTbl}>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Depth</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {this.props.project.holes.map((hole, idx) => (
                 <tr key={idx}>
                   <td>#{idx + 1}</td>
                   <td>{hole.type}</td>
                   <td>{hole.depth}</td>
                   <td>{hole.tags}</td>
                 </tr>
              ))}
            </tbody>
          </Table>
          <Notes notes={this.props.project.notes}
                 createNote={this.props.createNote}
                 submitCallback={this.submitNotes.bind(this)} />
          
        </Col>
      </Collapse>
    </div>
  )
}

export default ProjectListItem

