/* @flow */
import React, { PropTypes } from 'react'
import update from 'react/lib/update'

import classes from './ProjectForm.scss'

import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'

import { Multistep } from './Multistep'
import { Customer, Site, Hole, Save } from './widgets'
import { factory } from 'routes/Projects/modules/factory'

type Props = {
  project: {},
  onSubmit: Function,
  onCancel: Function,
  onUpdate: Function
}

export class ProjectForm extends React.Component {
  props: Props

  static propTypes = {
    project: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  onUpdateCustomer = (customer) => {
    const project = update(this.props.project, {
      customer: { $set: customer }
    })
    this.props.onUpdate(project)
  }

  onUpdateSite = (site) => {
    const project = update(this.props.project, {
      site: { $set: site }
    })
    this.props.onUpdate(project)
  }

  onRemoveHole = (idx) => () => {
    const project = update(this.props.project, {
      holes: {
        $set: this.props.project.holes.filter((h,i) => (i !== idx))
      }
    })
    this.props.onUpdate(project)
  }

  onCreateHole = () => {
    const project = update(this.props.project, {
      holes: {
        $push: [factory.hole()]
      }
    })
    this.props.onUpdate(project)
  }

  onUpdateHole = (idx) => (hole) => {
    const project = update(this.props.project, {
      holes: {
        $set: this.props.project.holes.map((h, i) => (i === idx ? hole : h))
      }
    })
    this.props.onUpdate(project)
  }

  render = () => {
    let steps = [
      {
        name: 'Customer',
        component: (
          <Customer customer={this.props.project.customer}
                    onUpdate={this.onUpdateCustomer}/>
        )
      },
      {
        name: 'Site',
        component: (
          <Site site={this.props.project.site}
                onUpdate={this.onUpdateSite}
                customer={this.props.project.customer}/>
        )
      }
    ]

    // Calculate which steps to push based on the number of holes.
    // We assign random keys and pray for no collisions
    this.props.project.holes.map((hole, idx) => {
      steps.push({
        name: "Hole #" + (idx + 1).toString(),
        component: (
          <Hole hole={hole}
                onCreate={this.onCreateHole}
                onUpdate={this.onUpdateHole(idx)}
                onRemove={this.onRemoveHole(idx)}
                key={idx}
          />
        )
      })
    })

    // Also put the "Finished" step at the end
    steps.push({
      name: 'Finished',
      component: <Save onSubmit={this.props.onSubmit} />
    })

    return (
      <Modal show={true} onHide={this.props.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Multistep steps={steps} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ProjectForm
