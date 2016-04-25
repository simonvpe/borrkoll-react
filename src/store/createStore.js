import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import logger from './logger'
import PouchDB from 'pouchdb';
import PouchMiddleware from 'vendor/pouch-redux-middleware'

import { PROJECT_DELETE, PROJECT_INSERT, PROJECT_UPDATE } from 'routes/Projects/modules/projects'

export default (initialState = {}, history) => {
  PouchDB.debug.enable('*')
  let db = new PouchDB('borrkoll')

  const pouchMiddleware = PouchMiddleware({
    path: '/projects/projects',
    db,
    actions: {
      remove: (doc) => store.dispatch({ type: PROJECT_DELETE, id: doc._id }),
      insert: (doc) => store.dispatch({ type: PROJECT_INSERT, project: doc }),
      update: (doc) => store.dispatch({ type: PROJECT_UPDATE, project: doc })
    }
  })

  let middleware = applyMiddleware(pouchMiddleware, thunk, routerMiddleware(history), logger)

  // Use DevTools chrome extension in development
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers(), initialState, middleware)

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default

      store.replaceReducer(reducers)
    })
  }

  return store
}
