import updateState from 'react/lib/update'
import { factory } from './factory'
import { PROJECT_INSERT, PROJECT_UPDATE } from './projects'

export const PROJECT_EDIT_START = 'PROJECT_EDIT_START'
export const PROJECT_EDIT_CANCEL = 'PROJECT_EDIT_CANCEL'
export const PROJECT_EDIT_SUBMIT = 'PROJECT_EDIT_SUBMIT'
export const PROJECT_EDIT_RESOLVE = 'PROJECT_EDIT_RESOLVE'
export const PROJECT_EDIT_UPDATE = 'PROJECT_EDIT_UPDATE'

export function resolve (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_EDIT_RESOLVE,
    project: Object.assign({}, project)
  }
}

export function start (project) {
  if (project === undefined || typeof project !== 'object') {
    project = factory.project()
  }
  return {
    type: PROJECT_EDIT_START,
    project: Object.assign({}, project)
  }
}

export function update (project) {
  if (project === undefined || typeof project !== 'object') {
    throw new Error('Argument (project) must be an object!')
  }
  return {
    type: PROJECT_EDIT_UPDATE,
    project: Object.assign({}, project)
  }
}

export function cancel () {
  return {
    type: PROJECT_EDIT_CANCEL
  }
}

export function submit () {
  return (dispatch, getState) => {
    const state = getState().editProject // <== TODO: FIX THIS UGLYNESS!
    if (!state || typeof state.project !== 'object') {
      throw new Error('Trying to submit with bad property "project"')
    }
    let project = Object.assign({}, state.project)
    dispatch({ type: PROJECT_EDIT_SUBMIT })
    dispatch({ type: PROJECT_INSERT, project: project })
  }
}

export const actions = {
  resolve,
  start,
  update,
  cancel,
  submit
}

const ACTION_HANDLERS = {

  [PROJECT_EDIT_START]: (state, action) => {
    if (action.project === undefined || typeof action.project != 'object') {
      throw new Error('Property (project) must be an object!')
    }
    return updateState(state, {
      project: { $set: Object.assign({}, action.project) },
      working: { $set: false }
    })
  },

  [PROJECT_EDIT_CANCEL]: (state, action) => {
    return updateState(state, {
      project: { $set: undefined },
      working: { $set: false }
    })
  },

  [PROJECT_EDIT_SUBMIT]: (state, action) => {
    return updateState(state, {
      working: { $set: true }
    })
  },

  [PROJECT_EDIT_UPDATE]: (state, action) => {
    if (action.project === undefined || typeof action.project !== 'object') {
      throw new Error('Property (project) must be an object!')
    }
    if (state.working) {
      return state
    }

    return updateState(state, {
      project: { $set: Object.assign({}, action.project) }
    })
  },

  [PROJECT_UPDATE]: (state, action) => {
    if (action.project === undefined || typeof action.project !== 'object') {
      throw new Error('Property (project) must be an object!')
    }
    if (!state.project) return state
    if (state.project._id !== action.project._id) return state

    return updateState(state, {
      // Our project was updated successfully so
      //   clear the working flag
      working: { $set: false },
      //   and clear the project ref
      project: { $set: state.working ? undefined : state.project },

      // Our project was updated when editing, this means there is a conflict
      // which needs to be resolved
      conflict: { $set: state.working ? state.conflict : action.project }
    })
  },

  [PROJECT_EDIT_RESOLVE]: (state, action) => {
    if (action.project === undefined || typeof action.project !== 'object') {
      throw new Error('Property (project) must be an object!')
    }
    return updateState(state, {
      project: { $set: action.project },
      conflict: { $set: undefined }
    })
  }
}

export const initialState = {
  project: undefined,
  working: false,
  conflict: undefined,
  error: undefined
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
