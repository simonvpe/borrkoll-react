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

type Props = {
  project: {},
  saveCallback: Function,
  cancelCallback: Function,
  createHole: Function,
  createNote: Function
}

export class ProjectForm extends React.Component {
  props: Props

  static propTypes = {
    project: PropTypes.object,
    saveCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
    createHole: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    this.setState(this.props.project)
  }

  customerCallback = (customer) => {
    this.setState(update(this.state, {
      customer: { $set: customer }
    }))
  }

  siteCallback = (site) => {
    this.setState(update(this.state, {
      site: { $set: site }
    }))
  }

  addHoleCallback = () => {
    this.setState(update(this.state, {
      holes: {
        $push: [this.props.createHole()]
      }
    }))
  }

  holeCallback = (idx) => (hole) => {
    console.log(idx, hole, this.state)
    this.setState({
      holes: this.state.holes.map((h, i) => (i === idx ? hole : h))
    }, () => console.log(this.state))
  }

  saveCallback = () => this.props.saveCallback(this.state)

  render = () => {
    let steps = [
      {
        name: 'Customer',
        component: (
          <Customer customer={this.state.customer}
                    callback={this.customerCallback}/>
        )
      },
      {
        name: 'Site',
        component: (
          <Site site={this.state.site}
                callback={this.siteCallback}
                customer={this.state.customer}/>
        )
      }
    ]

    // Calculate which steps to push based on the number of holes.
    // We assign random keys and pray for no collisions
    let id = () => Math.floor(Math.random() * 1000000)
    this.state.holes.map((hole, idx) => {
      steps.push({
        name: "Hole #" + (idx + 1).toString(),
        component: (
          <Hole hole={hole}
            index={id()}
            addHoleCallback={this.addHoleCallback}
            callback={this.holeCallback(idx)}
            createNote={this.props.createNote}
            key={idx}
          />
        )
      })
    })

    // Also put the "Finished" step at the end
    steps.push({
      name: 'Finished',
      component: <Save callback={this.saveCallback} />
    })

    //let show = Object.keys(this.props.project).length > 0

    return (
      <Modal show={true} onHide={this.props.cancelCallback}>
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
