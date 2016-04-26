import { shape, factory } from 'routes/Projects/modules/factory'

describe('(Factory) Projects', () => {
  describe('PropTypes', () => {
    it('Should export shape.note as a function.', () => {
      expect(shape.note).to.be.a('function')
    })

    it('Should export shape.hole as a function.', () => {
      expect(shape.hole).to.be.a('function')
    })

    it('Should export shape.project as a function.', () => {
      expect(shape.project).to.be.a('function')
    })

    it('Should export shape.customer as a function.', () => {
      expect(shape.customer).to.be.a('function')
    })

    it('Should export shape.site as a function.', () => {
      expect(shape.site).to.be.a('function')
    })
  })

  describe('factory.note', () => {
    it('Should be exported as a function.', () => {
      expect(factory.note).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.note()).to.be.a('object')
    });

    it('Should validate against its PropTypes.', () => {
      const props = { note: factory.note() }
      expect(shape.note(props, 'note')).to.equal(null)
    })
  })

  describe('factory.project', () => {
    it('Should be exported as a function.', () => {
      expect(factory.project).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.project()).to.be.a('object')
    })

    it('Should have a "holes" property with an empty default hole object.', () => {
      expect(factory.project()).to.have.property('holes')
        .that.is.a('array').with.length(1)
    })

    it('Should have a "completed" property that is a false boolean.', () => {
      expect(factory.project()).to.have.property('completed', false)
    })

    it('Should validate against its PropTypes.', () => {
      const props = { project: factory.note() }
      expect(shape.note(props, 'project')).to.equal(null)
    })
  })

  describe('factory.hole', () => {
    it('Should be exported as a function.', () => {
      expect(factory.hole).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.hole()).to.be.a('object')
    })

    it('Should have a "tags" property that is an empty array.', () => {
      expect(factory.hole()).to.have.property('tags')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "notes" property that is an empty array.', () => {
      expect(factory.hole()).to.have.property('notes')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "completed" property that is a false boolean.', () => {
      expect(factory.hole()).to.have.property('completed', false)
    })

    it('Should validate against its PropTypes.', () => {
      const props = { project: factory.hole() }
      expect(shape.note(props, 'hole')).to.equal(null)
    })        
  })
})
