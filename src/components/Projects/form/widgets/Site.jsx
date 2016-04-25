import React, { PropTypes } from 'react'

import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

type Props = {
  site: {},
  customer: {},
  callback: Function
}

export class Site extends React.Component {
  props: Props

  static propTypes = {
    site: PropTypes.object.isRequired,
    customer: PropTypes.object,
    callback: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    console.log("SITE WILL MOUNT", this.props.site)
    this.setState(this.props.site)
  }

  handleChange = () => this.props.callback(this.state)

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

  copyFromCustomer = () => {
    this.setState({
      street: this.props.customer.street,
      city: this.props.customer.city,
      zipCode: this.props.customer.zipCode,
      country: this.props.customer.country
    }, this.handleChange)
  }

  render = () => (
    <Form horizontal>

      <FormGroup controlId='copy'>
        <Col smOffset={3} sm={9}>
          <Button href='#' onClick={this.copyFromCustomer} bsClass="btn btn-success">
            <Glyphicon glyph='forward' /> Copy from customer
          </Button>
        </Col>
      </FormGroup>

      <FormGroup controlId='street'>
        <ControlLabel>Street</ControlLabel>
        <FormControl type='text'
                     placeholder='Street'
                     onChange={this.handleStreetChanged}
                     value={this.state.street}
                     autoFocus
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

      <FormGroup controlId='zipCode'>
        <ControlLabel>Zip Code</ControlLabel>
        <FormControl type='text'
                     placeholder='Zip code'
                     onChange={this.handleZipCodeChanged}
                     value={this.state.zipCode}
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
