import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  toggleQuestionVisibilityFilter,
  QuestionFilters
} from '../actions/questionVisibilityFilter'

class ToggleQuestions extends Component {
  render () {
    const {
      changeQuestionVisibilityFilter,
      questionVisibilityFilter
    } = this.props

    const isActive =
      questionVisibilityFilter === QuestionFilters.UNANSWERED ? true : false

    return (
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-12 text-center'>
            <button
              onClick={() =>
                changeQuestionVisibilityFilter(QuestionFilters.UNANSWERED)
              }
              className={`btn mr-4 ${isActive ? 'isActive' : 'notActive'}`}
            >
              Unanswered
            </button>
            <button
              onClick={() =>
                changeQuestionVisibilityFilter(QuestionFilters.ANSWERED)
              }
              className={`btn ${isActive ? 'notActive' : 'isActive'}`}
            >
              ANSWERED
            </button>
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

ToggleQuestions.propTypes = {
  changeQuestionVisibilityFilter: PropTypes.func.isRequired
}

const mapStateToProps = ({ questionVisibilityFilter }) => ({
  questionVisibilityFilter
})

export default connect(mapStateToProps, {
  changeQuestionVisibilityFilter: toggleQuestionVisibilityFilter
})(ToggleQuestions)
