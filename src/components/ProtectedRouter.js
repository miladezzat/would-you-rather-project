import React from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"

const ProtectedRouter = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const mapStateToProps = ({ authedUser }) => ({
  isAuthenticated: authedUser !== null
})
export default withRouter(connect(mapStateToProps)(ProtectedRouter))
