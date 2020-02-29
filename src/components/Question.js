import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../util/helpers'

const Question = ({ question }) => {
  console.log(question)

  const { optionOne, optionTwo } = question

  return (
    <div className='col-12 col-md-8 offset-md-2 p-0 mb-2 question'>
      <Link style={{ textDecoration: 'none' }} to={`/questions/${question.id}`}>
        <div className='card p-0 m-0'>
          <div className='card-body'>
            <h5 className='text-center text-success h3'>Would You Rather</h5>
            <p className='text-secondary text-center'>
              create at: {formatDate(question.timestamp)}
              <br />
              author @{question.author}
            </p>
            <div className='card-text'>
              <p className='text-center lead'>{optionOne.text}</p>
              <p className='text-center lead'>{optionTwo.text}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


const mapStateToProps = ({ questions }, { id }) => {
  const question = questions[id]
  return {
    question
  }
}

export default connect(mapStateToProps)(Question)
