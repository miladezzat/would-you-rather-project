import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const AddPollButton = () => (
  <Link className="btn addBtn" to='/newquestion'>
    <AddIcon />
  </Link>
)

export default AddPollButton
