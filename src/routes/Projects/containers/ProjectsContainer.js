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
  onUpdate: projectsActions.update,
  onRemove: projectsActions.remove,
  onEdit: editProjectActions.start,
  onEditUpdate: editProjectActions.update,
  onSubmit: editProjectActions.submit,
  onCancel: editProjectActions.cancel
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    editProject: state.editProject.project
  }
}

export default connect(mapStateToProps, mapActionCreators)(Projects)
