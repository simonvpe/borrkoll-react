import React, { PropTypes } from 'react'
import update from 'react/lib/update'

import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

type Props = {
  customer: {},
  onUpdate: Function
}

export class Customer extends React.Component {
  props: Props

  static propTypes = {
    customer: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  onUpdateFirstName = (event) => {
    const customer = update(this.props.customer, {
      firstName: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  onUpdateLastName = (event) => {
    const customer = update(this.props.customer, {
      lastName: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  onUpdateStreet = (event) => {
    const customer = update(this.props.customer, {
      street: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  onUpdateCity = (event) => {
    const customer = update(this.props.customer, {
      city: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  onUpdateZipCode = (event) => {
    const customer = update(this.props.customer, {
      zipCode: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  onUpdateCountry = (event) => {
    const customer = update(this.props.customer, {
      country: { $set: event.target.value }
    })
    this.props.onUpdate(customer)
  }

  render = () => (
    <Form horizontal>
      <FormGroup controlId='firstName'>
        <ControlLabel>First name</ControlLabel>
        <FormControl type='text'
                     placeholder='First name'
                     onChange={this.onUpdateFirstName}
                     value={this.props.customer.firstName}
                     autoFocus
        />
      </FormGroup>

      <FormGroup controlId='lastName'>
        <ControlLabel>Last name</ControlLabel>
        <FormControl type='text'
                     placeholder='Last name'
                     onChange={this.onUpdateLastName}
                     value={this.props.customer.lastName}
        />
      </FormGroup>

      <FormGroup controlId='street'>
        <ControlLabel>Street</ControlLabel>
        <FormControl type='text'
                     placeholder='Street'
                     onChange={this.onUpdateStreet}
                     value={this.props.customer.street}
        />
      </FormGroup>

      <FormGroup controlId='zipCode'>
        <ControlLabel>Zip Code</ControlLabel>
        <FormControl type='text'
                     placeholder='Zip code'
                     onChange={this.onUpdateZipCode}
                     value={this.props.customer.zipCode}
        />
      </FormGroup>
      
      <FormGroup controlId='city'>
        <ControlLabel>City</ControlLabel>
        <FormControl type='text'
                     placeholder='City'
                     onChange={this.onUpdateCity}
                     value={this.props.customer.city}
        />
      </FormGroup>

      <FormGroup controlId='country'>
        <ControlLabel>Country</ControlLabel>
        <FormControl type='text'
                     placeholder='Country'
                     onChange={this.onUpdateCountry}
                     value={this.props.customer.country}
        />
      </FormGroup>

    </Form>
  )
}
