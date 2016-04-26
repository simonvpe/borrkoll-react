let nextId = () => {
    // Id is milliseconds since 2016-01-01 00:00:00.000
  let now = new Date().getTime()
  let epoch = new Date(2016, 1, 1, 0, 0, 0, 0).getTime()
  return (now - epoch).toString()
}

export const factory = {
  note: () => ({
    username: '',
    text: '',
    timestamp: new Date().toISOString()
  }),

  hole: () => ({
    type: '',
    depth: 0,
    tags: [],
    notes: [],
    completed: false
  }),

  project: (id : string = nextId()) => ({
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
    holes: [factory.hole()],
    completed: false
  })
}

export default factory
