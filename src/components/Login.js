import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './User'
import { setAuthedUser } from '../actions/authedUser'
import { fetchQuestions } from '../actions/questions'
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    selectedUser: null
  }

  handleToggle = value => {
    this.setState({
      selectedUser: value
    })
  }

  handleLoginClick = () => {
    this.props.login(this.state.selectedUser)
    this.props.getPolls()
    this.setState({
      redirectToReferrer: true
    })
  }

  render () {
    const { userIds } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2'>
            <div className='card mt-5'>
              <div className='card-body'>
                <h5 className='card-title text-center text-primary h1'>
                  Login
                </h5>
                <hr />
                {userIds &&
                  userIds.map(id => (
                    <div
                      role='button'
                      tabIndex='0'
                      className='mb-2'
                      onClick={() => this.handleToggle(id)}
                      onKeyPress={() => this.handleToggle(id)}
                      key={id}
                    >
                      <User
                        id={id}
                        isSelected={this.state.selectedUser === id}
                      />
                    </div>
                  ))}
                <button
                  className='btn loginBtn btn-block'
                  disabled={!this.state.selectedUser}
                  onClick={this.handleLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ users }) => ({
  userIds: Object.keys(users)
})

export default connect(mapStateToProps, {
  login: setAuthedUser,
  getPolls: fetchQuestions
})(Login)
