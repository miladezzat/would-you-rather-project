import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Leaderboard (props) {
  const { users } = props

  return (
    <table className='table mt-5'>
      <thead className='thead-dark'>
        <tr>
          <th scope='col'>Rank</th>
          <th scope='col'> Profile</th>
          <th scope='col'>User</th>
          <th scope='col'>Questions Asked</th>
          <th scope='col'>Questions Answered</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <th scope='row'>{index + 1}</th>
            <td>
              <img
                className='avatarIcon'
                src={user.avatarURL}
                alt={user.name}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.questions.length}</td>
            <td>{Object.keys(user.answers).length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Leaderboard.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      answers: PropTypes.object.isRequired
    }).isRequired
  ).isRequired
}

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  }
}

export default connect(mapStateToProps)(Leaderboard)
