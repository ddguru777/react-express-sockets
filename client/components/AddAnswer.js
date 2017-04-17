import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postQuestionAnswer } from '../actions/sockets/answer'

class AddAnswer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
    this.resetValues = this.resetValues.bind(this)
  }

  handleAnswerChange (event) {
    this.setState({ answer: event.target.value })
  }

  resetValues () {
    this.setState({ answer: '' })
  }

  submitAnswer () {
    // Form message data
    // For now, user_id is hardcoded. We will want to reference this.state.user.user in the future
    let data = {
      user_id: '1',
      message: this.state.answer,
      question_id: this.props.id
    }

    // Check to make sure we have all the necessary data points to successfully insert record
    if (data.user_id && data.message && data.question_id) {
      // If we have all the data call action
      this.props.postQuestionAnswer(data)
      this.resetValues()
    } else {
      console.log('Missing some info')
    }
  }

  render () {
    return (
      <div>
        <input type='text' value={this.state.answer} onChange={this.handleAnswerChange} name='answer' placeholder='Add an answer...' />
        <span className="button" onClick={this.submitAnswer}>Respond!</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postQuestionAnswer: (data) => dispatch(postQuestionAnswer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer)