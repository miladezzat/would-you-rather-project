import React from "react"
import PropTypes from "prop-types"
import {
  LinearProgress,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core"
import { Done } from "@material-ui/icons"

const styles = theme => ({
  progressBar: {
    height: 10
  },
  radioBtn: {
    color: theme.palette.secondary.light
  }
})

const QuestionOption = ({ classes, isChecked, text, votes, percent }) => (
  <li className="list-group-item">
    {isChecked && (
      <ListItemIcon>
        <Done className={classes.radioBtn} />
      </ListItemIcon>
    )}
    <ListItemText inset>
      {text}
      {`(${votes} votes | ${percent}%)`}
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={percent}
      />
    </ListItemText>
  </li>
)

QuestionOption.propTypes = {
  classes: PropTypes.shape({
    progressBar: PropTypes.string.isRequired,
    radioBtn: PropTypes.string.isRequired
  }).isRequired,
  isChecked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired
}

export default withStyles(styles)(QuestionOption)
