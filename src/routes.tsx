import { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import WatchLater from './pages/WatchLater'

import { AuthContext } from './contexts/auth'

import MovieRepository from './repositories/MovieRepository'
import WatchLaterRepository from './repositories/WatchLaterRepository'
import UserRepository from './repositories/UserRepository'

export default function Routes (): JSX.Element {
  const { signed } = useContext(AuthContext)

  function CustomRoute ({ isPrivate = false, isLogin = false, isRegister = false, ...rest }): JSX.Element {
    if (isPrivate && !signed) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: { message: 'You need to sign up to see that page' }
        }}
        />
      )
    } else if (isLogin && signed) {
      return <Redirect to='/' />
    } else if (isRegister && signed) {
      return <Redirect to='/' />
    }

    return <Route {...rest} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute
          exact path='/' component={() => Home(new MovieRepository(), new WatchLaterRepository())}
        />
        <CustomRoute isLogin path='/login' component={() => Login(new UserRepository())} />
        <CustomRoute isRegister path='/register' component={() => Register(new UserRepository())} />
        <CustomRoute isPrivate path='/watchlater' component={() => WatchLater(new WatchLaterRepository())} />
      </Switch>
    </BrowserRouter>
  )
}
