import { connect } from 'react-redux'

import { actions as projectsActions } from 'routes/Projects/modules/projects'
import { actions as editProjectActions } from 'routes/Projects/modules/edit'
import { factory } from 'routes/Projects/modules/factory'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Projects from 'components/Projects'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
//  increment: () => increment(1),
  //  doubleAsync
  insertProject: (project) => projectsActions.insert(project),
  updateProject: (project) => projectsActions.update(project),
  removeProject: (id) => projectsActions.remove(id),
  editProjectStart: (project) => editProjectActions.start(project),
  editProjectCancel: () => editProjectActions.cancel(),
  editProjectSubmit: () => editProjectActions.submit(),
  editProjectResolve: (project) => editProjectActions.resolve(project),
  editProjectUpdate: (project) => editProjectActions.update(project)
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    editProject: state.editProject
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  projects: stateProps.projects,
  actions: {
    insert: dispatchProps.insertProject,
    update: dispatchProps.updateProject,
    remove: dispatchProps.removeProject,
  },
  edit: Object.assign({}, stateProps.editProject, {
    actions: {
      start: () => dispatchProps.editProjectStart(factory.project()),
      cancel: dispatchProps.editProjectCancel,
      submit: dispatchProps.editProjectSubmit,
      resolve: dispatchProps.editProjectResolve,
      update: dispatchProps.editProjectUpdate
    }
  }),
  factory: {
    project: factory.project,
    hole: factory.hole,
    note: factory.note
  }
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators, mergeProps)(Projects)
