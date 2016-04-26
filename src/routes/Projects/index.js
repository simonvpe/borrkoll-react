import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'projects',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ProjectsContainer',
      './modules/factory',
      './modules/projects',
      './modules/edit'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Projects = require('./containers/ProjectsContainer').default
      injectReducer(store, { key: 'projects', reducer: require('./modules/projects').default })
      injectReducer(store, { key: 'editProject', reducer: require('./modules/edit').default })

      next(null, Projects)
    })
  }
})
