import React from 'react'
import { Notes } from 'components/Notes/Notes'
import { Note } from 'components/Notes/Note'
import { factory } from 'routes/Projects/modules/factory'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

describe('(Component) Notes', () => {

  it('Should be wrapped in "notes" tags.', () => {
    let wrapper = shallow(<Notes notes={[]} onUpdate={spy()}/>)
    expect(wrapper.type()).to.equal('notes')
  })

  it('Should render a text area.', () => {
    let wrapper = shallow(<Notes notes={[]} onUpdate={spy()}/>)
    expect(wrapper.find('#note-add-text')).to.exist
  })

  it('Should render a submit button.', () => {
    let wrapper = shallow(<Notes notes={[]} onUpdate={spy()}/>)
    const button = wrapper.find('#note-add-button')
    expect(button).to.exist
  })

  it('Should render some notes.', () => {
    let onUpdate = spy()

    const notes = [
      factory.note(),
      factory.note(),
      factory.note()
    ]

    const wrapper = shallow(<Notes notes={notes} onUpdate={onUpdate} />)
    expect(wrapper.find(Note)).to.have.length(notes.length)
  })

  it('Should call onUpdate with the notes when clicking the submit button', () => {
    let onUpdate = spy()
    let wrapper = shallow(<Notes notes={[]} onUpdate={onUpdate}/>)

    let textarea = wrapper.find('#note-add-text')
    textarea.simulate('change', { target: { value: 'I am a note!' } })

    let button = wrapper.find('#note-add-button')
    button.simulate('click')

    expect(onUpdate.calledOnce).to.be.true
    expect(onUpdate.args[0][0][0].text).to.equal('I am a note!')
  })

  it('Should render an instruction text if there are no notes.', () => {
    const wrapper = shallow(<Notes notes={[]} onUpdate={spy()}/>)

    const instruction = wrapper.find('#note-add-instruction')
    expect(instruction).to.exist
    expect(instruction).to.have.text('There are no notes yet...')
  })

  it('Should not render an instruction text if there are notes.', () => {
    let onUpdate = spy()
    
    const notes = [factory.note(), factory.note()]
    const wrapper = shallow(<Notes notes={notes} onUpdate={onUpdate} />)
    const instruction = wrapper.find('#note-add-instruction')
    expect(instruction).not.to.exist
  })

  it('Should show a replacement text in the text area', () => {
    const wrapper = shallow(<Notes notes={[]} onUpdate={spy()}/>)
    const textarea = wrapper.find('#note-add-text')
    expect(textarea).to.have.attr('placeholder', 'Add notes (press Enter to save) ...')
  })

  it('Should clear the textarea when pressing the submit button', () => {
    expect(false).to.be.true
  })

  it('Should propagate removal of child notes to onUpdate', () => {
    let onUpdate = spy()

    const notes = [
      factory.note(),
      factory.note(),
      factory.note()
    ]

    let wrapper = shallow(<Notes notes={notes} onUpdate={onUpdate} />)
    expect(wrapper.find('#remove-button')).to.have.length(3)
  })

  it('Should propagate addition of child notes to onUpdate', () => {
    expect(false).to.be.true
  })

  it('Should propagate updates of child notes to onUpdate', () => {
    expect(false).to.be.true
  })
})
