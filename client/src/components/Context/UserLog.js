import React, { Component, createContext } from 'react'
import axios from 'axios'

// Create User Log In Context
export const UserLog = createContext();

// User Log Provider values set in class component
export class UserLogProvider extends Component {
  constructor() {
    super()
    this.state = {
      user: [],
      status: null
    }
  }

  // Sign In User Func 
  userSignIn = async (userInput) => {
    const { emailAddress, password } = userInput;
    await axios({
      method: 'get',
      url: 'http://localhost:5000/api/users',
      auth: {
        username: emailAddress,
        password: password
      }
    })
    .then( response => { 
      const user = response.data;
      localStorage.setItem('auth', JSON.stringify({ 
        user: {
          username: emailAddress,
          password: password,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id
        }
      }));
      return response;
    })
    .then(response => {
      localStorage.setItem('status', JSON.stringify({ 
      status: response.status
      }))
    })
    .catch(error => {
      this.setState({ status: error.response.status })
    })
  }

  // Sign User Out / Reset State / Remove "auth" key from local storage
  userSignOut = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('status');
    this.setState({
      user: [],
      status: null
    })
  }

  render() {
    return (
      <UserLog.Provider value={{
        state: this.state,
        userSignIn: this.userSignIn,
        userSignOut: this.userSignOut
        }}>
        {this.props.children}
      </UserLog.Provider>
    )
  }
}



