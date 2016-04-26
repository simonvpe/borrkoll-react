import {
  actions.update as update,
  actions.insert as insert
} from 'routes/Projects/modules/projects'

import {
  factory
} from 'routes/Projects/modules/factory'

import {
  actions,
  PROJECT_EDIT_START,
  PROJECT_EDIT_CANCEL,
  PROJECT_EDIT_SUBMIT,
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
  
  it('Should export a constant PROJECT_EDIT_UPDATE.', () => {
    expect(PROJECT_EDIT_UPDATE).to.equal('PROJECT_EDIT_UPDATE')
  })

  describe('(Action Creator) actions.start.', () => {
    it('Should be exported as a function.', () => {
      expect(actions.start).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_START.', () => {
      expect(actions.start()).to.have.property('type', PROJECT_EDIT_START)
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

  describe('(Action Creator) actions.cancel', () => {
    it('Should be exported as a function.', () => {
      expect(actions.cancel).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_CANCEL.', () => {
      expect(actions.cancel()).to.have.property('type', PROJECT_EDIT_CANCEL)
    })
  })


  describe('(Action Creator) actions.submit', () => {
    it('Should be exported as a function.', () => {
      expect(actions.submit).to.be.a('function')
    })

    it('Should return an action with type PROJECT_EDIT_SUBMIT.', () => {
      expect(actions.submit()).to.have.property('type', PROJECT_EDIT_SUBMIT)
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initialize a state.', () => {
      let state = reducer(undefined, {})
      expect(state.project).to.have.property('project', undefined)
      expect(state.project).to.have.property('working', false)
      expect(state.project).to.have.property('error', undefined)
    })

    it('Should return previous state if an action was not matched.', () => {
      const state1 = reducer(undefined, {})
      const state2 = reducer(state1, { type: '' })
      expect(state1).to.equal(state2)
    })

    describe('(Handler) PROJECT_EDIT_START', () => {
      it('Should assign a deep copy of the given project to the "project" property.', () => {
        const project = factory.project()
        const state = reducer(undefined, actions.start(project))
        expect(state).to.have.property('project').that.deep.equals(project)
        expect(state).to.have.property('project').that.not.equals(project)
      })
      
      // it('Should set the "working" property to true.', () => {
      //   const project = factory.project()
      //   const state1 = reducer(undefined, actions.start(project))
      //   expect(state).to.have.property('working', false)
      //   const state2 = reducer(state1, actions.start(project))
      //   expect(state2).to.have.property('working', true)
      // })
    })

    describe('(Handler) PROJECT_EDIT_CANCEL', () => {
      it('Should set the "project" property to undefined.', () => {
        const project = factory.project()
        const store = mockStore({ project, working: false })
        mockStore.dispatch(actions.cancel())
        expect(store.getState()).to.have.property('project', undefined)
      })
      it('Should set the "working" property to false.', () => {
        const project = factory.project()
        const store = mockStore({ project, working: true })
        mockStore.dispatch(actions.cancel())
        expect(store.getState()).to.have.property('working', false)
      })
    })
  })
})
