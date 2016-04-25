import {
  PROJECT_DELETE, PROJECT_INSERT, PROJECT_UPDATE,
  PROJECT_EDIT_START, PROJECT_EDIT_CANCEL,
  createProject, createHole, createNote,
  deleteProject, insertProject, updateProject,
  startEditingProject, cancelEditingProject,
  default as projectsReducer
} from 'routes/Projects/modules/projects'

describe('(Redux Module) Projects', () => {
  it('Should export a constant PROJECT_DELETE.', () => {
    expect(PROJECT_DELETE).to.equal('PROJECT_DELETE')
  })

  it('Should export a constant PROJECT_INSERT.', () => {
    expect(PROJECT_INSERT).to.equal('PROJECT_INSERT')
  })

  it('Should export a constant PROJECT_UPDATE.', () => {
    expect(PROJECT_UPDATE).to.equal('PROJECT_UPDATE')
  })

  it('Should export a constant PROJECT_EDIT_START.', () => {
    expect(PROJECT_EDIT_START).to.equal('PROJECT_EDIT_START')
  })

  it('Should export a constant PROJECT_EDIT_CANCEL.', () => {
    expect(PROJECT_EDIT_CANCEL).to.equal('PROJECT_EDIT_CANCEL')
  })

  describe('(Factory) createNote', () => {
    it('Should be exported as a function.', () => {
      expect(createNote).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(createNote()).to.be.a('object')
    });

    it('Should have a "username" property with an empty string value.', () => {
      expect(createNote()).to.have.property('username', '')
    })

    it('Should have a "text" property with an empty string value.', () => {
      expect(createNote()).to.have.property('text', '')
    })

    it('Should have a "timestamp" property with a string value.', () => {
      expect(createNote()).to.have.property('timestamp').that.is.a('string')
    })
  })

  describe('(Factory) createProject', () => {
    it('Should be exported as a function.', () => {
      expect(createProject).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(createProject()).to.be.a('object')
    })

    it('Should have a "site" property with empty string values.', () => {
      expect(createProject()).to.have.deep.property('site.street', '')
      expect(createProject()).to.have.deep.property('site.city', '')
      expect(createProject()).to.have.deep.property('site.zipCode', '')
      expect(createProject()).to.have.deep.property('site.country', '')
    })

    it('Should have a "customer" property with empty string values.', () => {
      expect(createProject()).to.have.deep.property('customer.firstName', '')
      expect(createProject()).to.have.deep.property('customer.lastName', '')
      expect(createProject()).to.have.deep.property('customer.street', '')
      expect(createProject()).to.have.deep.property('customer.city', '')
      expect(createProject()).to.have.deep.property('customer.zipCode', '')
      expect(createProject()).to.have.deep.property('customer.country', '')
      expect(createProject()).to.have.deep.property('customer.phone', '')
      expect(createProject()).to.have.deep.property('customer.email', '')
    })

    it('Should have a "notes" property that is an empty array.', () => {
      expect(createProject()).to.have.property('notes')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "holes" property with an empty default hole object.', () => {
      expect(createProject()).to.have.property('holes')
        .that.is.a('array').with.length(1)
      expect(createProject().holes[0]).to.deep.equals(createHole())
    })

    it('Should have a "completed" property that is a false boolean.', () => {
      expect(createProject()).to.have.property('completed', false)
    })
  })

  describe('(Factory) createHole', () => {
    it('Should be exported as a function.', () => {
      expect(createHole).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(createHole()).to.be.a('object')
    })

    it('Should have a "type" property with an empty string value.', () => {
      expect(createHole()).to.have.property('type', '')
    })

    it('Should have a "depth" property that is a number with a value of 0.', () => {
      expect(createHole()).to.have.property('depth', 0)
    })

    it('Should have a "tags" property that is an empty array.', () => {
      expect(createHole()).to.have.property('tags')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "notes" property that is an empty array.', () => {
      expect(createHole()).to.have.property('notes')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "completed" property that is a false boolean.', () => {
      expect(createHole()).to.have.property('completed', false)
    })
  })

  describe('(Action Creator) insertProject', () => {
    it('Should be exported as a function.', () => {
      expect(insertProject).to.be.a('function')
    })

    it('Should return an action with type PROJECT_INSERT.', () => {
      let state = insertProject({})
      expect(state).to.have.property('type', PROJECT_INSERT)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = createProject()
      let state = insertProject(project)
      expect(state).to.have.property('project').that.deep.equals(project)
      expect(state).to.have.property('project').that.not.equals(project)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => insertProject()).to.throw('Argument (project) must be an object!')
      expect(() => insertProject('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) updateProject', () => {
    it('Should be exported as a function.', () => {
      expect(updateProject).to.be.a('function')
    })

    it('Should return an action with type PROJECT_UPDATE.', () => {
      let state = updateProject({})
      expect(state).to.have.property('type', PROJECT_UPDATE)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = createProject()
      let state = updateProject(project)
      expect(state).to.have.property('project').that.deep.equals(project)
      expect(state).to.have.property('project').that.not.equals(project)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => updateProject()).to.throw('Argument (project) must be an object!')
      expect(() => updateProject('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) deleteProject', () => {
    it('Should be exported as a function.', () => {
      expect(deleteProject).to.be.a('function')
    })

    it('Should return an action with type PROJECT_DELETE.', () => {
      let state = deleteProject('')
      expect(state).to.have.property('type', PROJECT_DELETE)
    })

    it('Should assign the first argument to the "id" property.', () => {
      let id = 'id'
      let state = deleteProject(id)
      expect(state).to.have.property('id', id)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => deleteProject()).to.throw('Argument (id) must be a string!')
      expect(() => deleteProject(99)).to.throw('Argument (id) must be a string!')
    })
  })

  describe('(Action Creator) startEditingProject.', () => {
    it('Should be exported as a function.', () => {
      expect(startEditingProject).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_START.', () => {
      let state = startEditingProject(createProject())
      expect(state).to.have.property('type', PROJECT_EDIT_START)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = createProject()
      let state = startEditingProject(project)
      expect(state).to.have.property('project').that.deep.equals(project)
      expect(state).to.have.property('project').that.not.equals(project)
    })
    
    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => startEditingProject()).to.throw('Argument (project) must be an object!')
      expect(() => startEditingProject('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) cancelEditingProject.', () => {
    it('Should be exported as a function.', () => {
      expect(cancelEditingProject).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_CANCEL.', () => {
      let state = cancelEditingProject()
      expect(state).to.have.property('type', PROJECT_EDIT_CANCEL)
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(projectsReducer).to.be.a('function')
    })

    it('Should initialize state with an empty projects array.', () => {
      let state = projectsReducer(undefined, {})
      expect(state.projects).to.have.length(0)
    })

    it('Should return previous state if an action was not matched.', () => {
      let state = projectsReducer(undefined, {})

      expect(state.projects).to.have.length(0)
      state = projectsReducer(state, { type: '@@@@@@' })

      expect(state.projects).to.have.length(0)
      state = projectsReducer(state, insertProject(createProject()))

      expect(state.projects).to.have.length(1)
      state = projectsReducer(state, { type: '@@@@@@' })

      expect(state.projects).to.have.length(1)
    })

    describe('(Handler) PROJECT_INSERT', () => {
      it('Should insert projects at the beginning of the "projects" property.', () => {
        let state = projectsReducer(undefined, {})
        let projects = []

        let project = createProject()

        state = projectsReducer(state, insertProject(project))
        projects.unshift(project)

        expect(state.projects).to.have.length(1)
        expect(state.projects[0]).to.deep.equal(project)
        expect(state.projects[0]).to.not.equal(project)

        project = createProject()
        state = projectsReducer(state, insertProject(project))
        projects.unshift(project)

        expect(state.projects).to.have.length(2)
        expect(state.projects[0]).to.deep.equal(project)
        expect(state.projects[0]).to.not.equal(project)
      })
    })

    describe('(Handler) PROJECT_UPDATE', () => {
      it('Should update the correct project with respect to its id.', () => {
        let state = projectsReducer(undefined, insertProject(createProject(0)))
        state = projectsReducer(state, insertProject(createProject(1)))
        state = projectsReducer(state, insertProject(createProject(2)))
        state = projectsReducer(state, insertProject(createProject(3)))

        let project0 = state.projects[0]
        project0.notes.push('my project notes')
        state = projectsReducer(state, updateProject(project0))
        expect(state.projects[0]).to.deep.equal(project0)
        expect(state.projects[0]).to.not.equal(project0)

        let project2 = state.projects[2]
        project2.notes.push('my secret notes')
        state = projectsReducer(state, updateProject(project2))
        expect(state.projects[2]).to.deep.equal(project2)
        expect(state.projects[2]).to.not.equal(project2)

        let project3 = state.projects[3]
        project3.completed = true
        state = projectsReducer(state, updateProject(project3))
        expect(state.projects[3]).to.deep.equal(project3)
        expect(state.projects[3]).to.not.equal(project3)
      })
    })

    describe('(Handler) PROJECT_DELETE', () => {
      it('Should delete the correct project with respect to its id.', () => {
        let i = 0
        let state = projectsReducer(undefined, insertProject(createProject(i++)))
        state = projectsReducer(state, insertProject(createProject(i++)))
        state = projectsReducer(state, insertProject(createProject(i++)))
        state = projectsReducer(state, insertProject(createProject(i++)))

        expect(state.projects.map((p) => p._id)).to.have.members(['0', '1', '2', '3'])

        state = projectsReducer(state, deleteProject('3'))
        expect(state.projects.map((p) => p._id)).to.have.members(['0', '1', '2'])

        state = projectsReducer(state, deleteProject('1'))
        expect(state.projects.map((p) => p._id)).to.have.members(['0', '2'])

        state = projectsReducer(state, deleteProject('0'))
        expect(state.projects.map((p) => p._id)).to.have.members(['2'])

        state = projectsReducer(state, deleteProject('2'))
        expect(state.projects.map((p) => p._id)).to.have.length('0')
      })
    })

    describe('(Handler) PROJECT_EDIT_START', () => {
      it('Should assign the "editProject" property with a deep copy of the given project.', () => {
        let state = projectsReducer(undefined, {})
        let project = createProject(77)

        expect(state.editProject).to.be.an('undefined')

        state = projectsReducer(state, startEditingProject(project))

        expect(state.editProject).not.to.be.an('undefined')
        expect(state.editProject).to.deep.equal(project)
        expect(state.editProject).to.not.equal(project)
      })

      it('Should throw if property "project" is undefined.', () => {
        let project = createProject(78)
        let state = projectsReducer(undefined, startEditingProject(project))

        expect(state.editProject).to.deep.equal(project)
        expect(state.editProject).to.not.equal(project)

        expect(() => state = projectsReducer(state, startEditingProject(undefined)))
          .to.throw('Argument (project) must be an object!')

        expect(state.editProject).to.deep.equal(project)
        expect(state.editProject).to.not.equal(project)
      })
    })

    describe('(Handler) PROJECT_EDIT_CANCEL', () => {
      it('Should set the "editProject" property to undefined.', () => {
        let project = createProject(87)
        let state = projectsReducer(undefined, startEditingProject(project))

        expect(state.editProject).to.deep.equal(project)
        expect(state.editProject).to.not.equal(project)

        state = projectsReducer(state, cancelEditingProject())

        expect(state.editProject).to.be.an('undefined')
      })
    })
  })
})
