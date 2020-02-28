import React from 'react'
import PropTypes from 'prop-types'
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

User.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = ({ users }, { id }) => ({
  user: users[id]
})

export default connect(mapStateToProps)(User)
