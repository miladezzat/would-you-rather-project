import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
import AddQuestionButton from './AddQuestionButton'

const Questions = ({ questionIds }) => (
  <div className='container'>
    <div className='row mb-5 mt-3'>
      <div className='col-12'>
        <h1 className='text-center mt-3 mb-2 text-primary'>Feed News</h1>
      </div>
    </div>
    <div className='row mb-3'>
      {questionIds.map(id => (
        <Question key={id} id={id} />
      ))}
    </div>
    <AddQuestionButton />
  </div>
)

Questions.propTypes = {
  questionIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default Questions;
