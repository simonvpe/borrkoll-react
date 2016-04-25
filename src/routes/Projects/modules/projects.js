import update from 'react/lib/update'

// ------------------------------------
// Constants
// ------------------------------------
export const PROJECT_DELETE = 'PROJECT_DELETE'
export const PROJECT_INSERT = 'PROJECT_INSERT'
export const PROJECT_UPDATE = 'PROJECT_UPDATE'
export const PROJECT_EDIT_START = 'PROJECT_EDIT_START'
export const PROJECT_EDIT_CANCEL = 'PROJECT_EDIT_CANCEL'
export const PROJECT_EDIT_SUBMIT = 'PROJECT_EDIT_SUBMIT'

// Human readable id`s while sacraficing collision rate
export const createNote = () => ({
  username: '',
  text: '',
  timestamp: new Date().toISOString()
})

export const createHole = () => ({
  type: '',
  depth: 0,
  tags: [],
  notes: [],
  completed: false
})

export const createProject = (id : string = nextId()) => ({
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
  holes: [createHole()],
  completed: false
})

// ------------------------------------
// Action Creators
// ------------------------------------

export function insertProject (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_INSERT,
    project: project ? Object.assign({}, project) : undefined
  }
}

export function updateProject (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_UPDATE,
    project: project ? Object.assign({}, project) : undefined
  }
}

export function deleteProject (id) {
  if (id === undefined || typeof id !== 'string') {
    throw new Error('Argument (id) must be a string!')
  }
  return {
    type: PROJECT_DELETE, id: id
  }
}

export function startEditingProject (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_EDIT_START,
    project: project ? Object.assign({}, project) : undefined
  }
}

export function cancelEditingProject () {
  return {
    type: PROJECT_EDIT_CANCEL
  }
}

export function submitEditingProject () {
  return {
    type: PROJECT_EDIT_SUBMIT
  }
}

export const actions = {
  deleteProject,
  insertProject,
  updateProject,
  startEditingProject,
  cancelEditingProject
}

// ------------------------------------
// Action Handlers
// ------------------------------------

let nextId = () => {
    // Id is milliseconds since 2016-01-01 00:00:00.000
  let now = new Date().getTime()
  let epoch = new Date(2016, 1, 1, 0, 0, 0, 0).getTime()
  return (now - epoch).toString()
}

const ACTION_HANDLERS = {

  [PROJECT_INSERT]: (state, action) => {
    return update(state, {
      projects: {
        $unshift: [action.project]
      }
    })
  },

  [PROJECT_UPDATE]: (state, action) => {
    return update(state, {
      projects: {
        $set: state.projects.map(
          (p) => p._id === action.project._id
            ? action.project
            : p
        )
      }
    })
  },

  [PROJECT_DELETE]: (state, action) => {
    return update(state, {
      projects: {
        $set: state.projects.filter((p) => p._id !== action.id)
      }
    })
  },

  [PROJECT_EDIT_START]: (state, action) => {
    return update(state, {
      editProject: {
        $set: action.project ? action.project : state.editProject
      }
    })
  },

  [PROJECT_EDIT_CANCEL]: (state, action) => {
    return update(state, {
      editProject: {
        $set: undefined
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  projects: [],
  editProject: undefined
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
