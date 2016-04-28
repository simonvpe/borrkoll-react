import React, { PropTypes } from 'react'
import update from 'react/lib/update'

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
  onUpdate: Function
}

export class Site extends React.Component {
  props: Props

  static propTypes = {
    site: PropTypes.object.isRequired,
    customer: PropTypes.object,
    onUpdate: PropTypes.func.isRequired
  }

  onUpdateStreet = (event) => {
    const site = update(this.props.site, {
      street: { $set: event.target.value }
    })
    this.props.onUpdate(site)
  }

  onUpdateCity = (event) => {
    const site = update(this.props.site, {
      city: { $set: event.target.value }
    })
    this.props.onUpdate(site)
  }

  onUpdateZipCode = (event) => {
    const site = update(this.props.site, {
      zipCode: { $set: event.target.value }
    })
    this.props.onUpdate(site)
  }

  onUpdateCountry = (event) => {
    const site = update(this.props.site, {
      country: { $set: event.target.value }
    })
    this.props.onUpdate(site)
  }

  onCopyFromCustomer = () => {
    const site = Object.assign({}, {
      street: this.props.customer.street,
      city: this.props.customer.city,
      zipCode: this.props.customer.zipCode,
      country: this.props.customer.country
    })
    this.props.onUpdate(site)
  }

  render = () => (
    <Form horizontal>

      <FormGroup controlId='copy'>
        <Col smOffset={3} sm={9}>
          <Button href='#' onClick={this.onCopyFromCustomer} bsClass="btn btn-success">
            <Glyphicon glyph='forward' /> Copy from customer
          </Button>
        </Col>
      </FormGroup>

      <FormGroup controlId='street'>
        <ControlLabel>Street</ControlLabel>
        <FormControl type='text'
                     placeholder='Street'
                     onChange={this.onUpdateStreet}
                     value={this.props.site.street}
                     autoFocus
        />
      </FormGroup>
      
      <FormGroup controlId='city'>
        <ControlLabel>City</ControlLabel>
        <FormControl type='text'
                     placeholder='City'
                     onChange={this.onUpdateCity}
                     value={this.props.site.city}
        />
      </FormGroup>

      <FormGroup controlId='zipCode'>
        <ControlLabel>Zip Code</ControlLabel>
        <FormControl type='text'
                     placeholder='Zip code'
                     onChange={this.onUpdateZipCode}
                     value={this.props.site.zipCode}
        />
      </FormGroup>

      <FormGroup controlId='country'>
        <ControlLabel>Country</ControlLabel>
        <FormControl type='text'
                     placeholder='Country'
                     onChange={this.onUpdateCountry}
                     value={this.props.site.country}
        />
      </FormGroup>
      
    </Form>
  )
}
