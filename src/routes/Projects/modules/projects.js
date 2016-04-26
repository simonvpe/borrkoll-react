import updateState from 'react/lib/update'

// ------------------------------------
// Constants
// ------------------------------------
export const PROJECT_REMOVE = 'PROJECT_REMOVE'
export const PROJECT_INSERT = 'PROJECT_INSERT'
export const PROJECT_UPDATE = 'PROJECT_UPDATE'

// Human readable id`s while sacraficing collision rate

// ------------------------------------
// Action Creators
// ------------------------------------

export function insert (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_INSERT,
    project: project ? Object.assign({}, project) : undefined
  }
}

export function update (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_UPDATE,
    project: project ? Object.assign({}, project) : undefined
  }
}

export function remove (id) {
  if (id === undefined || typeof id !== 'string') {
    throw new Error('Argument (id) must be a string!')
  }
  return {
    type: PROJECT_REMOVE,
    id: id
  }
}

export const actions = {
  insert,
  update,
  remove
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {

  [PROJECT_INSERT]: (state, action) => {
    if (action.project === undefined || typeof action.project !== 'object') {
      throw new Error('Property (project) must be an object!')
    }
    return updateState(state, {
      projects: {
        $unshift: [action.project]
      }
    })
  },

  [PROJECT_UPDATE]: (state, action) => {
    if (action.project === undefined || typeof action.project !== 'object') {
      throw new Error('Property (project) must be an object!')
    }
    return updateState(state, {
      projects: {
        $set: state.projects.map(
          (p) => p._id === action.project._id
            ? action.project
            : p
        )
      }
    })
  },

  [PROJECT_REMOVE]: (state, action) => {
    if (action.id === undefined || typeof action.id !== 'string') {
      throw new Error('Property (id) must be a string!')
    }
    return updateState(state, {
      projects: {
        $set: state.projects.filter((p) => p._id !== action.id)
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  projects: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
