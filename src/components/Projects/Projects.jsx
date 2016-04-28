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
  editProject: {},
  onUpdate: Function,
  onRemove: Function,
  onEdit: Function,
  onEditUpdate: Function,
  onSubmit: Function,
  onCancel: Function,
}

export class Projects extends React.Component {
  props: Props

  static propTypes = {
    projects: PropTypes.arrayOf(Object).isRequired,
    editProject: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditUpdate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  onRemove = (project) => () => this.props.onRemove(project._id)
  onEdit = (project) => () => this.props.onEdit(project)

  render = () => {
    // Conditionally render <ProjectForm>
    let projectEdit
    if (this.props.editProject) {
      projectEdit = (
        <ProjectForm
            project={this.props.editProject}
            onUpdate={this.props.onEditUpdate}
            onSubmit={this.props.onSubmit}
            onCancel={this.props.onCancel}
        />
      )
    }
    return (
      <div>
        <ProjectListToolbar createCallback={this.props.onEdit}/>
        {projectEdit}
        <ProjectListHeader />
        {this.props.projects.map((project) => (
           <ProjectListItem
               key={project._id}
               project={project}
               onUpdate={this.props.onUpdate}
               onRemove={this.onRemove(project)}
               onEdit={this.onEdit(project)}

           />
         ))}
      </div>
    )
  }
}

export default Projects
