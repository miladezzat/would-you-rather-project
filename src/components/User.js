import React from 'react'
import { connect } from 'react-redux'
import {
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core'

const User = ({ isSelected, user }) => (
  <li className='list-group-item loginUserLink'>
    <img className='avatarIcon' src={user.avatarURL} alt={user.name} />
    <span>{user.name}</span>
    <ListItemSecondaryAction>
      <Checkbox checked={isSelected} />
    </ListItemSecondaryAction>
  </li>
)


const mapStateToProps = ({ users }, { id }) => ({
  user: users[id]
})

export default connect(mapStateToProps)(User)
