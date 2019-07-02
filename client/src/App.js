import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

// Higher Order Component
import PrivateRoute from './components/HOC/PrivateRoute'

// Coomponents 
import Courses from './components/Course/Courses/Courses'
import CourseDetail from './components/Course/CourseDetail/CourseDetail'
import CreateCourse from './components/Course/CreateCourse'
import UpdateCourse from './components/Course/UpdateCourse'
import UserSignUp from './components/User/UserSignUp'
import UserSignIn from './components/User/UserSignIn'
import UserSignOut from './components/User/UserSignOut'
import NotFound from './components/Errors/NotFound'
import Forbidden from './components/Errors/Forbidden'
import UnhandledError from './components/Errors/UnhandledError'

// Context API
import { UserLogProvider } from './components/Context/UserLog';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      statusCode: null,
      error: [],
      userAuth: false
    }
  }

  // Error Handler
  errorHandler = (err) => {
    console.log(err);
  }

  render() {
  return (
    <UserLogProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/courses/create' component={CreateCourse} />
          <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
          <Route path='/courses/:id' component={CourseDetail} /> 
          <Route path='/signin' component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
          <Route path='/signout' component={UserSignOut} />
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/error' component={UnhandledError} />
          <Route path='/notfound' component={NotFound} />
          <Route exact path = '/' component={Courses} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </UserLogProvider>
    )
  }
}
