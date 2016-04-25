import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'projects',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ProjectsContainer',
      './modules/projects'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Counter = require('./containers/ProjectsContainer').default
      const reducer = require('./modules/projects').default

      injectReducer(store, { key: 'projects', reducer })

      next(null, Counter)
    })
  }
})
