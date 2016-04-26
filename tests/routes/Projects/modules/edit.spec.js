import {
  PROJECT_INSERT,
  PROJECT_UPDATE
} from 'routes/Projects/modules/projects'

import {
  factory
} from 'routes/Projects/modules/factory'

import {
  actions,
  PROJECT_EDIT_START,
  PROJECT_EDIT_CANCEL,
  PROJECT_EDIT_SUBMIT,
  PROJECT_EDIT_RESOLVE,
  PROJECT_EDIT_UPDATE,
  default as reducer
} from 'routes/Projects/modules/edit'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middleware = [ thunk ]
const mockStore = configureStore(middleware)

describe('(Redux Module) Project edit', () => {
  it('Should export a constant PROJECT_EDIT_START.', () => {
    expect(PROJECT_EDIT_START).to.equal('PROJECT_EDIT_START')
  })

  it('Should export a constant PROJECT_EDIT_CANCEL.', () => {
    expect(PROJECT_EDIT_CANCEL).to.equal('PROJECT_EDIT_CANCEL')
  })

  it('Should export a constant PROJECT_EDIT_SUBMIT.', () => {
    expect(PROJECT_EDIT_SUBMIT).to.equal('PROJECT_EDIT_SUBMIT')
  })

  it('Should export a constant PROJECT_EDIT_RESOLVE.', () => {
    expect(PROJECT_EDIT_RESOLVE).to.equal('PROJECT_EDIT_RESOLVE')
  })

  it('Should export a constant PROJECT_EDIT_UPDATE.', () => {
    expect(PROJECT_EDIT_UPDATE).to.equal('PROJECT_EDIT_UPDATE')
  })
  
  describe('(Action Creator) actions.start.', () => {
    it('Should be exported as a function.', () => {
      expect(actions.start).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_START.', () => {
      const project = factory.project()
      expect(actions.start(project)).to.have.property('type', PROJECT_EDIT_START)
    })

    it('Should assign a deep copy of the first argument to the "project" property.', () => {
      let project = factory.project()
      let act = actions.start(project)
      expect(act).to.have.property('project').that.deep.equals(project)
      expect(act).to.have.property('project').that.not.equals(project)
    })

    it('Should throw if omitting argument or using wrong type.', () => {
      expect(() => actions.start()).to.throw('Argument (project) must be an object!')
      expect(() => actions.start('')).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) actions.update.', () => {
    it('Should be exported as a function.', () => {
      expect(actions.start).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_UPDATE.', () => {
      const project = factory.project()
      expect(actions.update(project)).to.have.property('type', PROJECT_EDIT_UPDATE)
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

  
  describe('(Action Creator) actions.cancel', () => {
    it('Should be exported as a function.', () => {
      expect(actions.cancel).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_CANCEL.', () => {
      expect(actions.cancel()).to.have.property('type', PROJECT_EDIT_CANCEL)
    })
  })

  describe('(Action Creator) actions.resolve', () => {
    it('Should be exported as a function.', () => {
      expect(actions.resolve).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_RESOLVE.', () => {
      const project = factory.project()
      expect(actions.resolve(project)).to.have.property('type', PROJECT_EDIT_RESOLVE)
    })

    it('Should throw if omitting "project" property or if it has the wrong type.', () => {
      const act1 = { type: PROJECT_EDIT_RESOLVE }
      const act2 = { type: PROJECT_EDIT_RESOLVE, project: '' }
      expect(() => actions.resolve()).to.throw('Argument (project) must be an object!')
      expect(() => actions.resolve()).to.throw('Argument (project) must be an object!')
    })
  })

  describe('(Action Creator) actions.submit', () => {
    it('Should be exported as a function.', () => {
      expect(actions.submit).to.be.a('function')
    })

    it('Should return a funcion (thunk)', () => {
      expect(actions.submit()).to.be.a('function')
    })

    it('Should dispatch actions PROJECT_EDIT_SUBMIT and PROJECT_INSERT.', () => {
      const project = factory.project()
      const store = mockStore({ project, working: false })
      const act = actions.submit()

      const expectedActions = [
        { type: PROJECT_EDIT_SUBMIT },
        { type: PROJECT_INSERT, project }
      ]

      store.dispatch(act)
      expect(store.getActions()).to.deep.equal(expectedActions)
    })

    it('Should throw if property "project" is not an object.', () => {
      const store = mockStore({})
      const act = actions.submit()
      expect(() => store.dispatch(act)).to.throw('Trying to submit with bad property "project"')
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initialize a state.', () => {
      let state = reducer(undefined, {})
      expect(state).to.have.property('project', undefined)
      expect(state).to.have.property('working', false)
      expect(state).to.have.property('error', undefined)
    })

    it('Should return previous state if an action was not matched.', () => {
      const state1 = reducer(undefined, {})
      const state2 = reducer(state1, { type: '' })
      expect(state1).to.equal(state2)
    })

    describe('(Handler) PROJECT_EDIT_START', () => {
      it('Should assign a deep copy of the given project to the "project" property.', () => {
        const project = factory.project()
        const state = reducer(undefined, { type: PROJECT_EDIT_START, project })
        expect(state).to.have.property('project').that.deep.equals(project)
        expect(state).to.have.property('project').that.not.equals(project)
      })

      it('Should set the "working" property to false.', () => {
        const project = factory.project()
        const state = reducer({ working: true }, { type: PROJECT_EDIT_START, project })
        expect(state).to.have.property('working', false)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_EDIT_START }
        const act2 = { type: PROJECT_EDIT_START, project: '' }
        expect(() => reducer(undefined, act1)).to.throw('Property (project) must be an object!')
        expect(() => reducer(undefined, act2)).to.throw('Property (project) must be an object!')
      })
    })

    describe('(Handler) PROJECT_EDIT_CANCEL', () => {
      it('Should set the "project" property to undefined.', () => {
        const project = factory.project()
        const state = reducer({ project, working: false }, { type: PROJECT_EDIT_CANCEL })
        expect(state).to.have.property('project', undefined)
      })

      it('Should set the "working" property to false.', () => {
        const project = factory.project()
        const state = reducer({ project, working: true }, { type: PROJECT_EDIT_CANCEL })
        expect(state).to.have.property('working', false)
      })
    })

    describe('(Handler) PROJECT_EDIT_SUBMIT', () => {
      it('Should set the "working" property to true.', () => {
        const state1 = reducer({}, { type: PROJECT_EDIT_SUBMIT })
        expect(state1).to.have.property('working', true)
      })
    })

    describe('(Handler) PROJECT_EDIT_RESOLVE', () => {
      it('Should clear the "conflict" property.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('2')

        const state1 = { conflict: project1 }
        const state2 = reducer(state1, { type: PROJECT_EDIT_RESOLVE, project: project2 })
        expect(state2).to.have.property('conflict', undefined)
      })

      it('Should update the "project" property.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('2')

        const state1 = { conflict: project2, project: project1 }
        const state2 = reducer(state1, { type: PROJECT_EDIT_RESOLVE, project: project2 })

        expect(state2).to.have.property('conflict', undefined)
        expect(state2.project).to.deep.equal(project2)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_EDIT_RESOLVE }
        const act2 = { type: PROJECT_EDIT_RESOLVE, project: '' }
        expect(() => reducer({}, act1)).to.throw('Property (project) must be an object!')
        expect(() => reducer({}, act2)).to.throw('Property (project) must be an object!')
      })
    })

    describe('(Handler) PROJECT_EDIT_UPDATE', () => {
      it('Should update the "project" property.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('2')

        const state1 = { project: project1 }
        const state2 = reducer(state1, { type: PROJECT_EDIT_UPDATE, project: project2 })

        expect(state2.project).to.deep.equal(project2)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_EDIT_UPDATE }
        const act2 = { type: PROJECT_EDIT_UPDATE, project: '' }
        expect(() => reducer({}, act1)).to.throw('Property (project) must be an object!')
        expect(() => reducer({}, act2)).to.throw('Property (project) must be an object!')
      })

      it('Should return the current state if "working" is true.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('1')        
        const state1 = { working: true, project: project1 }
        const state2 = reducer(state1, { type: PROJECT_EDIT_UPDATE, project: project2 })
        expect(state2).to.equal(state1)
      })      
    })
    
    describe('(Handler) PROJECT_UPDATE', () => {
      it('Should return current state if recieved project is not the same as the curently editing one.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('2')

        const state1 = { project: project1 }
        const state2 = reducer(state1, { type: PROJECT_UPDATE, project: project2 })
        
        expect(state1).to.equal(state2)
      })
      
      it('Should reset the "working" property.', () => {
        const project1 = factory.project('1')
        const project2 = factory.project('2')

        const state1 = reducer({ project: project1, working: true, conflict: undefined }, {
          type: PROJECT_UPDATE,
          project: project2
        })
        expect(state1).to.have.property('working', true)
        expect(state1).to.have.property('conflict', undefined)
        const state2 = reducer(state1, {
          type: PROJECT_UPDATE,
          project: project1
        })
        expect(state2).to.have.property('working', false)
        expect(state2).to.have.property('conflict', undefined)
      })

      it('Should copy the recieved project to the "conflict" property if editing a project.', () => {
        const project1a = factory.project('1')
        const project1b = Object.assign(project1a, { completed: true })

        const state = reducer({ project: project1a, working: false }, {
          type: PROJECT_UPDATE,
          project: project1b
        })

        expect(state).to.have.property('working', false)
        expect(state.conflict).to.deep.equal(project1b)
      })

      it('Should set the "project" property to undefined if "working" is true.', () => {
        const project = factory.project()
        const store = mockStore({ project, working: true })

        const state1 = reducer({ project, working: true }, { type: PROJECT_UPDATE, project: project })
        expect(state1).to.have.property('project', undefined)

        const state2 = reducer({ project, working: false }, { type: PROJECT_UPDATE, project: project })
        expect(state2).to.have.property('project').that.deep.equals(project)
      })

      it('Should throw if omitting project property or if it has the wrong type.', () => {
        const act1 = { type: PROJECT_UPDATE }
        const act2 = { type: PROJECT_UPDATE, project: '' }
        expect(() => reducer(undefined, act1)).to.throw('Property (project) must be an object!')
        expect(() => reducer(undefined, act2)).to.throw('Property (project) must be an object!')
      })

    })
  })
})
