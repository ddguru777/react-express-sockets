import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListEntry from './ListEntry'

class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <h3>PostList</h3>
        <ListEntry />
        <ListEntry />
        <ListEntry />
        <ListEntry />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { questions: state.questions }
}

export default connect(mapStateToProps)(PostList)
