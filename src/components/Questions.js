import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'
import Question from './Question'
import AddQuestionButton from './AddQuestionButton'

const styles = {
  spacing: {
    padding: 20
  }
}

const Questions = ({ questionIds }) => (
  <div className='container'>
    <div className='row mb-5 mt-3'>
      <div className='col-12'>
        <h1 className='text-center mt-3 mb-2 text-primary'>Feed News</h1>
      </div>
    </div>
    <div className='row'>
      {questionIds.map(id => (
        <Question key={id} id={id} />
      ))}
    </div>
  </div>
)

Questions.propTypes = {
  classes: PropTypes.shape({
    spacing: PropTypes.string.isRequired
  }).isRequired,
  questionIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default withStyles(styles)(Questions)
