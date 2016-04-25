import ProjectsRoute from 'routes/Projects'

describe('(Route) Projects', () => {
  let _route

  beforeEach(() => {
    _route = ProjectsRoute({})
  })

  it('Should return a route configuration object.', () => {
    expect(typeof (_route)).to.equal('object')
  })

  it('Configuration should contain path "counter".', () => {
    expect(_route.path).to.equal('projects')
  })
})

