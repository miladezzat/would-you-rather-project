import { combineReducers } from "redux"
import { loadingBarReducer } from "react-redux-loading-bar"
import users from "./users"
import questions from "./questions"
import authedUser from "./authedUser"
import questionVisibilityFilter from "./questionVisibilityFilter"
import message from "./message"

export default combineReducers({
  users,
  authedUser,
  questions,
  questionVisibilityFilter,
  message,
  loadingBar: loadingBarReducer
})
