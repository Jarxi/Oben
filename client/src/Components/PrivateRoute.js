import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // const isLoggedIn = sessionStorage.getItem('loggedin') === 'true'
  // Note that code before return statement are initilized only once,
  // variable like loggedin needs to be checked in the return statement

  return (
    <Route {...rest} render={ function(props) {

        return sessionStorage.getItem('loggedin') === 'true' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }  
      }
    />
  )
}

export default PrivateRoute