import { PropTypes } from 'react'

let nextId = () => {
    // Id is milliseconds since 2016-01-01 00:00:00.000
  let now = new Date().getTime()
  let epoch = new Date(2016, 1, 1, 0, 0, 0, 0).getTime()
  return (now - epoch).toString()
}

const noteShape = PropTypes.shape({
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
})

const holeShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  notes: PropTypes.arrayOf(noteShape).isRequired,
  completed: PropTypes.bool.isRequired
})

const customerShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
})

const siteShape = PropTypes.shape({
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
})

const projectShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  customer: customerShape,
  site: siteShape,
  notes: PropTypes.arrayOf(noteShape),
  holes: PropTypes.arrayOf(holeShape),
  completed: PropTypes.bool.isRequired
})

const noteFactory = () => ({
  username: '',
  text: '',
  timestamp: new Date().toISOString()
})

const projectFactory = (id : string = nextId()) => ({
  _id: id.toString(),
  customer: {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    email: ''
  },
  site: {
    street: '',
    city: '',
    address: '',
    zipCode: '',
    country: ''
  },
  notes: [],
  holes: [holeFactory()],
  completed: false
})

const holeFactory = () => ({
  type: '',
  depth: 0,
  tags: [],
  notes: [],
  completed: false
})

export const shape = {
  note: noteShape,
  hole: holeShape,
  customer: customerShape,
  site: siteShape,
  project: projectShape
}

export const factory = {
  note: noteFactory,
  hole: holeFactory,
  project: projectFactory
}

export default factory
