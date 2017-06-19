import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chip from './Chip'

const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class App extends Component {
  state = {
    admin: [
      'hi@hiddenest.com'
    ],
    list: [
      'hello@hello.world',
      'me@hiddenest.kr',
      'hiddenest@sullivanproject.in'
    ],
    index: 0
  }

  handleRequestDelete = (index) => {
    let list = [...this.state.list]
    list.splice(index, 1)
    this.setState({ list })
  }

  handleRequestAdd = (value, index) => {
    if (this.state.list[index] === value) {
      return true
    }

    if (REGEX.test(value)) {
      if (this.state.admin.includes(value)) {
        return 'already'
      } else {
        let list = [...this.state.list]
        if (index !== undefined) {
          list[index] = value
          this.setState({ list })
          return true
        } else {
          list.push(value)
          this.setState({ list })
        }
      }
    } else {
      return 'invalid'
    }
  }

  handleRequestDelete = (index) => {
    let list = [...this.state.list]
    list.splice(index, 1)
    this.setState({ list })
  }

  handleSubmit = (event) => {
    if (event.keyCode === 13) {
      const value = event.target.value
      console.log('testing', this.state.admin.includes(value))
      if (this.state.admin.includes(value) || this.state.list.includes(value)) {
        return
      }

      if (REGEX.test(value)) {
        let list = [...this.state.list]
        list.push(value)
        this.setState({ list })
      }
    }
  }

  handlePressKeyMovement = (event) => {
    if (event.keyCode === 37 || event.keyCode === 39) {
      if (event.keyCode === 37 && this.state.index !== 0) {
        this.setState({ index: ++this.state.index })
      }

      if (event.keyCode === 39 && this.state.index < this.state.list.length) {
        this.setState({ index: --this.state.index })
      }

      const chip = document.getElementsByClassName('chip')[this.state.list.length - this.state.index - 1]
      if (chip !== undefined) chip.click()
    }
  }

  render = () => {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div
          className='input-wrapper'
        >
          {this.state.list.map((l, index) => {
            return (
              <Chip
                key={index}
                index={index}
                value={l}
                onRequestAdd={this.handleRequestAdd}
                onRequestDelete={this.handleRequestDelete}
              />
            )
          })}
          <input
            type='text'
            placeholder='새로운 관리자 이메일 입력'
            onKeyDown={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default App
