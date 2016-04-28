/* @flow */
import React, { PropTypes } from 'react'
import classes from './ProjectListItem.scss'
import { shape } from 'routes/Projects/modules/factory'

import Notes from 'components/Notes'
import Table from 'react-bootstrap/lib/Table'
import Col from 'react-bootstrap/lib/Col'
import Collapse from 'react-bootstrap/lib/Collapse'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

type Props = {
  project: {},
  onUpdate: Function, // (project) =>
  onEdit: PropTypes.func.isRequired, // () =>
  onRemove: Function, // () =>
}

export class ProjectListItem extends React.Component {
  props: Props

  static propTypes = {
    project: shape.project,
    onUpdate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func
  }

  componentWillMount() {
    this.setState({})
  }

  onTogglePanel = () => {
    this.setState(Object.assign({}, this.state, { open: !this.state.open } ))
  }

  onUpdateNote = (notes) => {
    const project = Object.assign({}, this.props.project, { notes })
    this.props.onUpdate(project)
  }

  render = () => (
    <div>
      <div className={'row panel panel-body ' + classes.headers}>
        <Col xs={12} sm={1}>
          <Glyphicon
              glyph={this.state.open ? 'chevron-down' : 'chevron-right'}
              onClick={this.onTogglePanel}
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
            <MenuItem eventKey='1' onClick={this.props.onRemove}>
              <Glyphicon glyph='remove' /> Delete
            </MenuItem>
            <MenuItem eventKey='2' onClick={this.props.onEdit}>
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
                 onUpdate={this.onUpdateNote} />
        </Col>
      </Collapse>
    </div>
  )
}

export default ProjectListItem

