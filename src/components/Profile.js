import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Questions from './Questions'

class Profile extends Component {
  render () {
    const {
      authedUser,
      questionsAsked,
      questionsAnswered,
      isLoading
    } = this.props

    return (
      <div className='container mt-4 mb-3'>
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2 text-center'>
            <img
              className='profileImage'
              src={authedUser.avatarURL}
              alt={authedUser.name}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2'>
            <h1 className='text-center text-primary text-uppercase'>
              {authedUser.name}
            </h1>
            <p className="text-center text-secondary">{`@${authedUser.id}`}</p>
          </div>
        </div>
        <div className='row mb-2 mt-2 shadow-lg bg-white p-2'>
          <div className='col-12 col-md-8 offset-md-2'>
            <h2 className="text-success text-center">{`Questions Asked(${questionsAsked.length})`}</h2>
          </div>
          {!isLoading && <Questions questionIds={questionsAsked} />}
        </div>
        <div className='row mb-2 mt-2 shadow-lg bg-white p-2'>
          <div className='col-12 col-md-8 offset-md-2'>
            <h2 className="text-success text-center">{`Questions Answered(${questionsAnswered.length})`}</h2>
          </div>
          {!isLoading && <Questions questionIds={questionsAnswered} />}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  authedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired
  }).isRequired,
  questionsAsked: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  questionsAnswered: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ users, questions, authedUser, loadingBar }) => {
  const questionsAsked = !questions ? [] : users[authedUser].questions
  const questionsAnswered = !questions
    ? []
    : Object.keys(users[authedUser].answers)

  return {
    authedUser: users[authedUser],
    questionsAsked,
    questionsAnswered,
    isLoading: loadingBar.default === 1
  }
}

export default connect(mapStateToProps)(Profile)
