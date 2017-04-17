import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSingleQuestion, fetchSingleQuestion } from '../actions/questions'
import { enterRoom, leaveRoom } from '../actions/sockets/questions'
import { socketFetchQuestion } from '../actions/sockets/questions'

class MainQuestion extends Component {
  componentWillMount () {
    let id = this.props.id
    this.props.enterRoom(id)
    if (Object.keys(this.props.question).length === 0) {
      this.props.socketFetchQuestion(id)
    } else {
      this.props.selectSingleQuestion(id)
    }
  }

  componentWillUnmount () {
    this.props.leaveRoom(this.props.id)
  }

  renderLoader () {
    return (<div>Loading...</div>)
  }

  render () {
    const { question } = this.props
    if (!question) { return this.renderLoader() }
    return (
      <h2>{question.message}</h2>
    )
  }
}

const mapStateToProps = (state) => {
  return { question: state.questions.selectedQuestion }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectSingleQuestion: (id) => dispatch(selectSingleQuestion(id)),
    fetchSingleQuestion: (id) => dispatch(fetchSingleQuestion(id)),
    socketFetchQuestion: (id) => dispatch(socketFetchQuestion(id)),
    enterRoom: (id) => dispatch(enterRoom(id)),
    leaveRoom: (id) => dispatch(leaveRoom(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainQuestion)
