import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chip extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  state = {
    isEditing: false,
    value: this.props.value,
    isValid: ''
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.isEditing && this.state.isEditing) {
      this.refs.input.focus()
    }
  }

  handleClickEdit = () => {
    this.setState({ isEditing: true })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handlePressKey = (event) => {
    if (event.keyCode === 27) {
      this.setState({ isEditing: false })
    }
    if (event.keyCode === 13) {
      const isValid = this.props.onRequestAdd(
        this.state.value,
        this.props.index
      )

      this.setState({
        isValid: isValid === true ? '' : isValid,
        isEditing: false
      })
    }
  }

  handleFocus = () => {
    console.log('asdfsadfsdfasdfsd', this.props.index)
  }

  render = () => {
    if (this.state.isEditing) {
      return (
        <input
          ref='input'
          type='text'
          placeholder='새로운 관리자 이메일 입력'
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handlePressKey}
          style={{width: `${(this.state.value.length + 1) * 7.5}px`}}
        />
      )
    } else {
      return (
        <span
          className={`chip ${this.state.isValid}`}
          onClick={this.handleFocus}
        >
          <span>{this.state.value}</span>
          <div
            className='edit'
            onClick={this.handleClickEdit}
          >
            수정
          </div>
          <div
            className='edit'
            onClick={() => this.props.onRequestDelete(this.props.index)}
          >
            삭제
          </div>
        </span>
      )
    }
  }
}

export default Chip
