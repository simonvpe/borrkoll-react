/* @flow */
import React, { PropTypes } from 'react'
import classes from './Projects.scss'

import ProjectListToolbar from './ProjectListToolbar'
import ProjectListHeader from './ProjectListHeader'
import ProjectListItem from './ProjectListItem'
import ProjectForm from './form'

// FlowType annotations
type Props = {
  insertProject: Function,
  updateProject: Function,
  deleteProject: Function,
  startEditingProject: Function,
  cancelEditingProject: Function,
  createHole: Function,
  createNote: Function,
  createProject: Function,
  projects: [],
  editProject: {}
}

export class Projects extends React.Component {
  props: Props

  static propTypes = {
    insertProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    startEditingProject: PropTypes.func.isRequired,
    cancelEditingProject: PropTypes.func.isRequired,
    createHole: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    editProject: PropTypes.object
  }

  startEditing = () => this.props.startEditingProject(this.props.createProject())

  render = () => {
    // Conditionally render <ProjectForm>
    let projectEdit
    if (this.props.editProject) {
      projectEdit = (
        <ProjectForm project={this.props.editProject}
          saveCallback={this.props.insertProject}
          cancelCallback={this.props.cancelEditingProject}
          createHole={this.props.createHole}
          createNote={this.props.createNote}
        />
      )
    }

    return (
      <div>
        <ProjectListToolbar createCallback={this.startEditing}/>
        {projectEdit}
        <ProjectListHeader />
        {this.props.projects.map((project) => (
           <ProjectListItem
               key={project._id}
               project={project}
               createNote={this.props.createNote}
               updateCallback={this.props.updateProject}
               deleteCallback={this.props.deleteProject}
               startEditingCallback={this.props.startEditingProject}
           />
         ))}
      </div>
    )
  }
}

export default Projects
