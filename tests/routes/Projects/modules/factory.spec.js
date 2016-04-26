import { factory } from 'routes/Projects/modules/factory'

describe('(Factory) Projects', () => {
  describe('factory.note', () => {
    it('Should be exported as a function.', () => {
      expect(factory.note).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.note()).to.be.a('object')
    });

    it('Should have a "username" property with an empty string value.', () => {
      expect(factory.note()).to.have.property('username', '')
    })

    it('Should have a "text" property with an empty string value.', () => {
      expect(factory.note()).to.have.property('text', '')
    })

    it('Should have a "timestamp" property with a string value.', () => {
      expect(factory.note()).to.have.property('timestamp').that.is.a('string')
    })
  })

  describe('factory.project', () => {
    it('Should be exported as a function.', () => {
      expect(factory.project).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.project()).to.be.a('object')
    })

    it('Should have a "site" property with empty string values.', () => {
      expect(factory.project()).to.have.deep.property('site.street', '')
      expect(factory.project()).to.have.deep.property('site.city', '')
      expect(factory.project()).to.have.deep.property('site.zipCode', '')
      expect(factory.project()).to.have.deep.property('site.country', '')
    })

    it('Should have a "customer" property with empty string values.', () => {
      expect(factory.project()).to.have.deep.property('customer.firstName', '')
      expect(factory.project()).to.have.deep.property('customer.lastName', '')
      expect(factory.project()).to.have.deep.property('customer.street', '')
      expect(factory.project()).to.have.deep.property('customer.city', '')
      expect(factory.project()).to.have.deep.property('customer.zipCode', '')
      expect(factory.project()).to.have.deep.property('customer.country', '')
      expect(factory.project()).to.have.deep.property('customer.phone', '')
      expect(factory.project()).to.have.deep.property('customer.email', '')
    })

    it('Should have a "notes" property that is an empty array.', () => {
      expect(factory.project()).to.have.property('notes')
        .that.is.a('array').with.length(0)
    })

    it('Should have a "holes" property with an empty default hole object.', () => {
      expect(factory.project()).to.have.property('holes')
        .that.is.a('array').with.length(1)
      expect(factory.project().holes[0]).to.deep.equals(factory.hole())
    })

    it('Should have a "completed" property that is a false boolean.', () => {
      expect(factory.project()).to.have.property('completed', false)
    })
  })

  describe('factory.hole', () => {
    it('Should be exported as a function.', () => {
      expect(factory.hole).to.be.a('function')
    })

    it('Should return an object.', () => {
      expect(factory.hole()).to.be.a('object')
    })

    it('Should have a "type" property with an empty string value.', () => {
      expect(factory.hole()).to.have.property('type', '')
    })

    it('Should have a "depth" property that is a number with a value of 0.', () => {
      expect(factory.hole()).to.have.property('depth', 0)
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
  })
})
