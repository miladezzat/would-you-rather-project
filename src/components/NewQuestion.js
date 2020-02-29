import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.isFormValid()) return

    this.props.addQuestion({
      author: this.props.authedUser,
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo
    })
    this.props.history.push('/')
  }

  isFormValid = () => !!this.state.optionOne && !!this.state.optionTwo

  render () {
    const isFormValid = this.isFormValid()
    return (
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-12 col-md-6 offset-md-3'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title text-primary text-center pt-4 pb-2'>
                  Would You Rather
                </h5>
                <form autoComplete='off' onSubmit={this.handleSubmit}>
                  <hr />
                  <div className='form-group'>
                    <label htmlFor='optionOne'>Option One</label>
                    <input
                      className='form-control'
                      id='optionOne'
                      name='optionOne'
                      onChange={this.handleChange}
                      value={this.state.optionOne}
                      placeholder='enter option 1'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='optionTwo'>Option Two</label>
                    <input
                      className='form-control'
                      id='optionTwo'
                      name='optionTwo'
                      onChange={this.handleChange}
                      value={this.state.optionTwo}
                      placeholder='enter option 2'
                    />
                  </div>
                  <hr />
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={!isFormValid}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ authedUser }) => ({
  authedUser
})

export default withRouter(
  connect(mapStateToProps, { addQuestion: handleAddQuestion })(NewQuestion)
)
