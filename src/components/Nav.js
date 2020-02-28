import React, { Component } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

class NavBar extends Component {
  render () {
    const { user, doLogout, history } = this.props
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
          Would U Rather
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <NavLink className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/leaderboard'>
                Leaderboard
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/newquestion'>
                Newquestion
              </NavLink>
            </li>
          </ul>
          {user && (
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to='/profile'>
                  <img className="avatarIcon" src={user.avatarURL} alt={user.name} />
                </Link>
              </li>
              <li className='nav-item'>
                <button
                  className='logout'
                  onClick={() => {
                    doLogout()
                    history.push('/')
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  user: users[authedUser]
})

export default withRouter(
  connect(mapStateToProps, {
    doLogout: logout
  })(NavBar)
)
