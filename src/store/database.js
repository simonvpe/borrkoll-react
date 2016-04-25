import PouchDB from 'pouchdb'
import PouchMiddleware from 'vendor/pouch-redux-middleware'
// import Immutable from 'immutable/dist/immutable'
// import { default as unwrap } from './unwrap'

import { PROJECT_DELETE, PROJECT_INSERT, PROJECT_UPDATE } from 'routes/Projects/modules/projects'

/* Since the pouch-redux-middleware expects non-immutable states */
/* it is required to wrap it in an immutable unwrapper. */

export default (store, db : PouchDB) => (
  PouchMiddleware({
    path: '/projects/projects',
    db,
    actions: {
      remove: (doc) => store.dispatch({ type: PROJECT_DELETE, id: doc._id }),
      insert: (doc) => store.dispatch({ type: PROJECT_INSERT, project: doc }),
      update: (doc) => store.dispatch({ type: PROJECT_UPDATE, project: doc })
    }
  })
)
