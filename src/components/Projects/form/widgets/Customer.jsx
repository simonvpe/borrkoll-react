import React, { PropTypes } from 'react'

import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

type Props = {
  customer: {},
  callback: Function
}

export class Customer extends React.Component {
  props: Props

  static propTypes = {
    customer: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState(this.props.customer)
  }

  handleChange = () => this.props.callback(this.state)
  
  handleFirstNameChanged = (event) => {
    this.setState({ firstName: event.target.value },
                  this.handleChange)
  }

  handleLastNameChanged = (event) => {
    this.setState({ lastName: event.target.value },
                  this.handleChange)
  }

  handleStreetChanged = (event) => {
    this.setState({ street: event.target.value },
                  this.handleChange)
  }

  handleCityChanged = (event) => {
    this.setState({ city: event.target.value },
                  this.handleChange)
  }

  handleZipCodeChanged = (event) => {
    this.setState({ zipCode: event.target.value },
                  this.handleChange)
  }

  handleCountryChanged = (event) => {
    this.setState({ country: event.target.value },
                  this.handleChange)
  }

  render = () => (
    <Form horizontal>
      <FormGroup controlId='firstName'>
        <ControlLabel>First name</ControlLabel>
        <FormControl type='text'
                     placeholder='First name'
                     onChange={this.handleFirstNameChanged}
                     value={this.state.firstName}
                     autoFocus
        />
      </FormGroup>

      <FormGroup controlId='lastName'>
        <ControlLabel>Last name</ControlLabel>
        <FormControl type='text'
                     placeholder='Last name'
                     onChange={this.handleLastNameChanged}
                     value={this.state.lastName}
        />
      </FormGroup>

      <FormGroup controlId='street'>
        <ControlLabel>Street</ControlLabel>
        <FormControl type='text'
                     placeholder='Street'
                     onChange={this.handleStreetChanged}
                     value={this.state.street}
        />
      </FormGroup>

      <FormGroup controlId='zipCode'>
        <ControlLabel>Zip Code</ControlLabel>
        <FormControl type='text'
                     placeholder='Zip code'
                     onChange={this.handleZipCodeChanged}
                     value={this.state.zipCode}
        />
      </FormGroup>
      
      <FormGroup controlId='city'>
        <ControlLabel>City</ControlLabel>
        <FormControl type='text'
                     placeholder='City'
                     onChange={this.handleCityChanged}
                     value={this.state.city}
        />
      </FormGroup>

      <FormGroup controlId='country'>
        <ControlLabel>Country</ControlLabel>
        <FormControl type='text'
                     placeholder='Country'
                     onChange={this.handleCountryChanged}
                     value={this.state.country}
        />
      </FormGroup>

    </Form>
  )
}
