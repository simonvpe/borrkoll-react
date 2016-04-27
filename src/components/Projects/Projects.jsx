/* @flow */
import React, { PropTypes } from 'react'
import classes from './Projects.scss'
import { shape } from 'routes/Projects/modules/factory'

import ProjectListToolbar from './ProjectListToolbar'
import ProjectListHeader from './ProjectListHeader'
import ProjectListItem from './ProjectListItem'
import ProjectForm from './form'

// FlowType annotations
type Props = {
  projects: array,
  actions: {
    insert: Function,
    update: Function,
    remove: Function
  },
  edit: {
    project: object,
    conflict: object,
    error: string,
    working: bool,
    actions: {
      start: Function,
      cancel: Function,
      submit: Function,
      resolve: Function,
      update: Function
    }
  },
  factory: {
    project: Function,
    hole: Function,
    note: Function
  }
}

export class Projects extends React.Component {
  props: Props

  static propTypes = {
    projects: PropTypes.arrayOf(shape.project).isRequired,
    actions: PropTypes.shape({
      insert: PropTypes.func.isRequired,
      update: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }),
    edit: PropTypes.shape({
      project: shape.project,
      conflict: shape.project,
      error: PropTypes.string,
      working: PropTypes.bool.isRequired,
      actions: PropTypes.shape({
        start: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
        resolve: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired
      })
    }),
    factory: PropTypes.shape({
      project: Function,
      hole: Function,
      note: Function
    })
  }

  render = () => {
    // Conditionally render <ProjectForm>
    let projectEdit
    if (this.props.edit.project) {
      projectEdit = (
        <ProjectForm project={this.props.edit.project}
          saveCallback={this.props.edit.actions.submit}
          cancelCallback={this.props.edit.actions.cancel}
          createHole={this.props.factory.hole}
          createNote={this.props.factory.note}
        />
      )
    }

    return (
      <div>
        <ProjectListToolbar createCallback={this.props.edit.actions.start}/>
        {projectEdit}
        <ProjectListHeader />
        {this.props.projects.map((project) => (
           <ProjectListItem
               key={project._id}
               project={project}
               createNote={this.props.factory.note}
               updateCallback={this.props.actions.update}
               deleteCallback={this.props.actions.remove}
               startEditingCallback={this.props.edit.actions.start}
           />
         ))}
      </div>
    )
  }
}

export default Projects
