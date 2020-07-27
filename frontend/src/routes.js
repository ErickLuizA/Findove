import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom' 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthContext from './contexts/auth'
import WatchLater from './pages/WatchLater'

export default function Routes() {

  const { signed } = useContext(AuthContext)

  function CustomRoute({ isPrivate, isLogin, isRegister, ...rest}) {
    if(isPrivate && !signed) {
      return <Redirect to={{
        pathname:"/login",
        state: { message: 'You need to sign up to see that page'}
      }} />
    } else if(isLogin && signed) {
      return <Redirect to="/" />
    } else if(isRegister && signed) {
      return <Redirect to="/" />
    }

    return <Route {...rest} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" component={Home} exact />
        <CustomRoute isLogin path="/login" component={Login} />
        <CustomRoute isRegister path="/register" component={Register} />
        <CustomRoute isPrivate path="/watchlater" component={WatchLater} />
      </Switch>
    </BrowserRouter>
  )
}