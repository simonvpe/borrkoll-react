import {
  PROJECT_REMOVE,
  PROJECT_INSERT,
  PROJECT_UPDATE,
  actions,
  default as projectsReducer
} from 'routes/Projects/modules/projects'

import {
  factory
} from 'routes/Projects/modules/factory'

describe('(Redux Module) Projects', () => {
  it('Should export a constant PROJECT_DELETE.', () => {
    expect(PROJECT_REMOVE).to.equal('PROJECT_REMOVE')
  })

  it('Should export a constant PROJECT_INSERT.', () => {
    expect(PROJECT_INSERT).to.equal('PROJECT_INSERT')
  })

  it('Should export a constant PROJECT_UPDATE.', () => {
    expect(PROJECT_UPDATE).to.equal('PROJECT_UPDATE')
  })

  describe('(Action Creator) actions.insert', () => {
    it('Should be exported as a function.', () => {
      expect(actions.insert).to.be.a('function')
    })

    it('Should return an action with type PROJECT_INSERT.', () => {
      let state = actions.insert({})
      expect(state).to.have.property('type', PROJECT_INSERT)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = factory.project()
      let act = actions.insert(project)
      expect(act).to.have.property('project').that.deep.equals(project)
      expect(act).to.have.property('project').that.not.equals(project)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => actions.insert()).to.throw('Argument (project) must be an object!')
      expect(() => actions.insert('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) actions.update', () => {
    it('Should be exported as a function.', () => {
      expect(actions.update).to.be.a('function')
    })

    it('Should return an action with type PROJECT_UPDATE.', () => {
      let state = actions.update({})
      expect(state).to.have.property('type', PROJECT_UPDATE)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = factory.project()
      let act = actions.update(project)
      expect(act).to.have.property('project').that.deep.equals(project)
      expect(act).to.have.property('project').that.not.equals(project)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => actions.update()).to.throw('Argument (project) must be an object!')
      expect(() => actions.update('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) actions.remove', () => {
    it('Should be exported as a function.', () => {
      expect(actions.remove).to.be.a('function')
    })

    it('Should return an action with type PROJECT_REMOVE.', () => {
      let state = actions.remove('')
      expect(state).to.have.property('type', PROJECT_REMOVE)
    })

    it('Should assign the first argument to the "id" property.', () => {
      let id = 'id'
      let state = actions.remove(id)
      expect(state).to.have.property('id', id)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => actions.remove()).to.throw('Argument (id) must be a string!')
      expect(() => actions.remove(99)).to.throw('Argument (id) must be a string!')
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
      state = projectsReducer(state, actions.insert(factory.project()))

      expect(state.projects).to.have.length(1)
      state = projectsReducer(state, { type: '@@@@@@' })

      expect(state.projects).to.have.length(1)
    })

    describe('(Handler) PROJECT_INSERT', () => {
      it('Should insert projects at the beginning of the "projects" property.', () => {
        let state = projectsReducer(undefined, {})
        let projects = []

        let project = factory.project()

        state = projectsReducer(state, actions.insert(project))
        projects.unshift(project)

        expect(state.projects).to.have.length(1)
        expect(state.projects[0]).to.deep.equal(project)
        expect(state.projects[0]).to.not.equal(project)

        project = factory.project()
        state = projectsReducer(state, actions.insert(project))
        projects.unshift(project)

        expect(state.projects).to.have.length(2)
        expect(state.projects[0]).to.deep.equal(project)
        expect(state.projects[0]).to.not.equal(project)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_INSERT }
        const act2 = { type: PROJECT_INSERT, project: '' }
        expect(() => projectsReducer(undefined, act1)).to.throw('Property (project) must be an object!')
        expect(() => projectsReducer(undefined, act2)).to.throw('Property (project) must be an object!')
      })
    })

    describe('(Handler) PROJECT_UPDATE', () => {
      it('Should update the correct project with respect to its id.', () => {
        let state = projectsReducer(undefined, actions.insert(factory.project(0)))
        state = projectsReducer(state, actions.insert(factory.project(1)))
        state = projectsReducer(state, actions.insert(factory.project(2)))
        state = projectsReducer(state, actions.insert(factory.project(3)))

        let project0 = state.projects[0]
        project0.notes.push('my project notes')
        state = projectsReducer(state, actions.update(project0))
        expect(state.projects[0]).to.deep.equal(project0)
        expect(state.projects[0]).to.not.equal(project0)

        let project2 = state.projects[2]
        project2.notes.push('my secret notes')
        state = projectsReducer(state, actions.update(project2))
        expect(state.projects[2]).to.deep.equal(project2)
        expect(state.projects[2]).to.not.equal(project2)

        let project3 = state.projects[3]
        project3.completed = true
        state = projectsReducer(state, actions.update(project3))
        expect(state.projects[3]).to.deep.equal(project3)
        expect(state.projects[3]).to.not.equal(project3)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_UPDATE }
        const act2 = { type: PROJECT_UPDATE, project: '' }
        expect(() => projectsReducer(undefined, act1)).to.throw('Property (project) must be an object!')
        expect(() => projectsReducer(undefined, act2)).to.throw('Property (project) must be an object!')
      })
    })

    describe('(Handler) PROJECT_REMOVE', () => {
      it('Should delete the correct project with respect to its id.', () => {
        let i = 0
        let state = projectsReducer(undefined, actions.insert(factory.project(i++)))
        state = projectsReducer(state, actions.insert(factory.project(i++)))
        state = projectsReducer(state, actions.insert(factory.project(i++)))
        state = projectsReducer(state, actions.insert(factory.project(i++)))

        expect(state.projects.map((p) => p._id)).to.have.members(['0', '1', '2', '3'])

        state = projectsReducer(state, actions.remove('3'))
        expect(state.projects.map((p) => p._id)).to.have.members(['0', '1', '2'])

        state = projectsReducer(state, actions.remove('1'))
        expect(state.projects.map((p) => p._id)).to.have.members(['0', '2'])

        state = projectsReducer(state, actions.remove('0'))
        expect(state.projects.map((p) => p._id)).to.have.members(['2'])

        state = projectsReducer(state, actions.remove('2'))
        expect(state.projects.map((p) => p._id)).to.have.length('0')
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_REMOVE }
        const act2 = { type: PROJECT_REMOVE, id: 12 }
        expect(() => projectsReducer(undefined, act1)).to.throw('Property (id) must be a string!')
        expect(() => projectsReducer(undefined, act2)).to.throw('Property (id) must be a string!')
      })
    })
  })
})
