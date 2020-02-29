import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { formatDate, calculateVotePercent } from '../util/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import QuestionOption from './QuestionOption'

class QuestionPage extends React.Component {
  state = {
    optionOne: '',
    optionTwo: '',
    isValid: false
  }

  handleChange = event => {
    
    this.setState({
      [event.target.id]: event.target.value,
      isValid: true,
    })
  }

  handleSubmit = () => {
    const { question, authedUser } = this.props
    const value =
      this.state.optionOne === '' ? this.state.optionTwo : this.state.optionOne
    this.props.saveAnswer({
      qid: question.id,
      authedUser,
      answer: value
    })
  }

  render () {
    const { question, author, isAnswered, authedUser, isLoading } = this.props

    if (!isLoading && !question) {
      return <Redirect to='/404' />
    }

    if (!question) {
      return <div />
    }

    const { optionOne, optionTwo } = question

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2'>
            <div className='card mt-5'>
              <div className='card-body'>
                <div>
                  <img
                    className='avatarQuestion'
                    src={author.avatarURL}
                    alt={author.name}
                  />
                  <span className='pl-2 text-secondary'>
                    {author.name}
                  </span>
                  <p className="text-secondary font-weight-lighter mt-2">{formatDate(question.timestamp)}</p>
                </div>
                <hr />
                <p className='h1 text-center text-primary'>Would You Rather</p>
                <hr />
                {!isAnswered && (
                  <form component='fieldset' required>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='w-u-r'
                        id='optionOne'
                        value='optionOne'
                        onChange={this.handleChange}
                      />
                      <label className='form-check-label' htmlFor='optionOne'>
                        {optionOne.text}
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='w-u-r'
                        id='optionTwo'
                        value='optionTwo'
                        onChange={this.handleChange}
                      />
                      <label className='form-check-label' htmlFor='optionTwo'>
                        {optionTwo.text}
                      </label>
                    </div>
                  </form>
                )}
                {isAnswered && (
                  <div>
                    <ul dense>
                      <QuestionOption
                        text={optionOne.text}
                        isChecked={optionOne.votes.includes(authedUser)}
                        votes={optionOne.votes.length}
                        percent={optionOne.percent}
                      />
                      <QuestionOption
                        text={optionTwo.text}
                        isChecked={optionTwo.votes.includes(authedUser)}
                        votes={optionTwo.votes.length}
                        percent={optionTwo.percent}
                      />
                    </ul>
                  </div>
                )}
                <hr />
                {!isAnswered && (
                  <button
                    className='btn btn-primary btn-block'
                    disabled={!this.state.isValid}
                    onClick={this.handleSubmit}
                  >
                    Answer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

QuestionPage.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired
    }),
    optionTwo: PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  }),
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired
  }),
  authedUser: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}


const mapStateToProps = (
  { questions, users, authedUser, loadingBar },
  props
) => {
  const { id } = props.match.params
  const question = questions[id]
  let isAnswered = false
  if (question) {
    question.optionOne.percent = calculateVotePercent(question, 'optionOne')
    question.optionTwo.percent = calculateVotePercent(question, 'optionTwo')
    const { optionOne, optionTwo } = question
    isAnswered =
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser)
  }
  return {
    question,
    author: question ? users[question.author] : null,
    authedUser,
    isAnswered,
    isLoading: loadingBar.default === 1
  }
}

export default connect(mapStateToProps, {
  saveAnswer: handleAnswerQuestion
})(QuestionPage)
