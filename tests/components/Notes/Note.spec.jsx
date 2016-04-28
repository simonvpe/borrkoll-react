import React from 'react'
import { Note } from 'components/Notes/Note'
import { factory } from 'routes/Projects/modules/factory'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

describe('(Component) Note', () => {

  it('Should be wrapped in "note" tags.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)
    expect(wrapper.type()).to.equal('note')
  })

  it('Should render an image.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)
    const image = wrapper.find('img')
    expect(image).to.exist
  })

  it('Should render a remove button.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)
    const button = wrapper.find('#remove-button')
    expect(button).to.exist
  })

  it('Should render an edit button.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)
    const button = wrapper.find('#edit-button')
    expect(button).to.exist
  })

  it('Should render the note text in a p element.', () => {
    let note = Object.assign(factory.note(), { text: "I am a note!" })
    let wrapper = shallow(<Note note={note} onUpdate={spy()} onRemove={spy()}/>
    )
    const elem = wrapper.find('#note-text')
    expect(elem).to.exist
    expect(elem.text()).to.equal('I am a note!')
    expect(elem.type()).to.equal('p')
  })

  it('Should render the note timestamp.', () => {
    let note = factory.note()
    let wrapper = shallow(<Note note={note} onUpdate={spy()} onRemove={spy()}/>)
    const elem = wrapper.find('#note-timestamp')
    expect(elem).to.exist
    expect(elem.text()).to.equal(note.timestamp)
  })

  it('Should render the note username.', () => {
    let note = Object.assign(factory.note(), { username: 'My username' })
    let wrapper = shallow(<Note note={note} onUpdate={spy()} onRemove={spy()}/>)
    const elem = wrapper.find('#note-username')
    expect(elem).to.exist
    expect(elem.text()).to.equal(note.username)
  })

  it('Should call the onRemove prop with no arguments when clicking the remove button.', () => {
    let onRemove = spy()
    let wrapper = shallow(<Note note={factory.note()} onRemove={onRemove} onUpdate={spy()}/>)
    wrapper.find('#remove-button').simulate('click')
    expect(onRemove.calledOnce).to.be.true
    expect(onRemove.args[0]).to.deep.equal([])
  })

  it('Should replace the note text with a textarea when clicking the edit button.', () => {
    let note = Object.assign(factory.note(), { text: 'This is my note' })
    let wrapper = shallow(<Note note={note} onUpdate={spy()} onRemove={spy()}/>)
    wrapper.find('#edit-button').simulate('click')
    const elem = wrapper.find('#note-text')
    expect(elem).to.exist
    expect(elem.type()).to.equal('textarea')
  })

  it('Should render a save button when clicking the edit button.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)

    expect(wrapper.find('#save-button')).not.to.exist

    wrapper.find('#edit-button').simulate('click')

    expect(wrapper.find('#save-button')).to.exist
  })

  it('Should hide the edit button when clicking the edit button.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    expect(wrapper.find('#edit-button')).not.to.exist
  })

  it('Should hide the remove button when clicking the edit button.', () => {
    let wrapper = shallow(<Note note={factory.note()} onUpdate={spy()} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    expect(wrapper.find('#remove-button')).not.to.exist
  })

  it('Should replace the textarea with a p when clicking the save button.', () => {
    let onUpdate = spy()
    let wrapper = shallow(<Note note={factory.note()} onUpdate={onUpdate} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#save-button').simulate('click')

    const elem = wrapper.find('#note-text')
    expect(elem).to.exist
    expect(elem.type()).to.equal('p')
  })

  it('Should hide the save button when clicking the save button.', () => {
    let onUpdate = spy()
    let wrapper = shallow(<Note note={factory.note()} onUpdate={onUpdate} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#save-button').simulate('click')

    expect(wrapper.find('#save-button')).not.to.exist
  })

  it('Should show the edit button when clicking the save button.', () => {
    let onUpdate = spy()
    let wrapper = shallow(<Note note={factory.note()} onUpdate={onUpdate} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#save-button').simulate('click')
    expect(wrapper.find('#edit-button')).to.exist
  })

  it('Should show the remove button when clicking the save button.', () => {
    let onUpdate = spy()
    let wrapper = shallow(<Note note={factory.note()} onUpdate={onUpdate} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')
    wrapper.find('#save-button').simulate('click')
    expect(wrapper.find('#remove-button')).to.exist
  })

  it('Should call onUpdate with an updated note when clicking the save button.', () => {
    let onUpdate = spy()
    const note = factory.note()
    let wrapper = shallow(<Note note={note} onUpdate={onUpdate} onRemove={spy()}/>)

    wrapper.find('#edit-button').simulate('click')

    let elem = wrapper.find('#note-text')
    const text = 'I am a note!'
    elem.simulate('change', { target: { value: text } })

    let saveButton = wrapper.find('#save-button').simulate('click')

    expect(onUpdate.calledOnce).to.be.true
    expect(onUpdate.args[0][0]).to.deep.equal(Object.assign(note, { text }))
  })
})
