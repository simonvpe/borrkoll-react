'use strict'
import React, { Component, PropTypes } from 'react'
import classes from './prog-tracker.scss'

function getNavStates(indx, length) {
  let styles = []
  for (let i=0; i<length; i++) {
    if(i < indx) {
      styles.push('done')
    }
    else if(i === indx) {
      styles.push('doing')
    }
    else {
      styles.push('todo')
    }
  }
  return { current: indx, styles: styles }
}

export class Multistep extends Component {

  componentWillMount = () => {
    this.setState({
      compState: 0,
      steps: this.props.steps,
      navState: getNavStates(0, this.props.steps.length)
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      steps: nextProps.steps,
      navState: getNavStates(this.state.compState, nextProps.steps.length)
    })
  }

  setNavState = (next) => {
    this.setState({navState: getNavStates(next, this.state.steps.length)})
    if (next < this.state.steps.length) {
      this.setState({compState: next})
    }
  }

  handleKeyDown = (evt) => {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick = (evt) => {
    console.log(this)
    if (evt.target.value  === (this.state.steps.length-1) &&
        this.state.compState === (this.state.steps.length-1)) {
          this.setNavState(this.state.steps.length)
    } else {
      this.setNavState(evt.target.value)
    }
  }

  next = () => {
    this.setNavState(this.state.compState + 1)
  }

  previous = () => {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  render = () => {
    return (
      <div className={classes.container} onKeyDown={this.handleKeyDown}>
        <ol className={classes.progtrckr}>
          {this.state.steps.map((s,i) => (
             <li value={i}
                 key={i}
                 className={classes['progtrckr_' + this.state.navState.styles[i]]}
                 onClick={this.handleOnClick}>
               
               <em>{i + 1}</em>
               <span>{this.state.steps[i].name}</span>
             </li>
           ))}
        </ol>
        {this.state.steps[this.state.compState].component}
      </div>
    )
  }
}

