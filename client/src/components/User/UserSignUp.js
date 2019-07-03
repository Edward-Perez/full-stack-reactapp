import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// Components 
import Header from '../Header/Header'
import Validation from '../Errors/Validation'

// Context
import { UserLog } from '../Context/UserLog'

export default class UserSignUp extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errorMessages: null,
      redirectUser: false
    }
  }
  // Redirect User to Home Page after succefully signing
  redirect = () => {
    if (this.state.redirectUser) {
      return <Redirect to='/' />
    }
  }

  // Updates State with input values
  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value 
    });
  }

  // Form submission 
  handleSubmit = (event, UserLog) => {
    event.preventDefault();

    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
    return this.setState({ errorMessages: ['Passwords do not match'] })
    }

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users',
      data: { firstName, lastName, emailAddress, password }
    })
    .then(async () => { 
      await UserLog.userSignIn({emailAddress, password})
    })
    .then(() => {
      this.setState({ redirectUser: true })
    })
    .catch(error => {
      const statusCode = error.response.status;
      const errorData = error.response.data.error.type;

      if (statusCode === 400) {
        const errorMessages = errorData.map(msg => msg.message);
        return this.setState({ errorMessages, statusCode });
      } else if (statusCode === 500) {
        return this.props.history.push('/error');
      } else {
        return this.props.history.push('/notfound');
      }
    })
  }

  render() {
    const { firstName, lastName, emailAddress, 
            password, confirmPassword, errorMessages } = this.state;
    return (
      <UserLog.Consumer>
        {value => 
        <Fragment>
          {
            this.redirect()
          }
          <Header />
          <div className="bounds">
            <div className="grid-33 centered signin">
              {
              errorMessages
              ? <Validation errorMessages={errorMessages} /> 
              : null 
              }
              <h1>Sign Up</h1>
              <div>
                <form onSubmit={(event) => {
                  const UserLog = value;
                  this.handleSubmit(event, UserLog);
                 }} >
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    className="" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={this.handleChange} />
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    className="" 
                    placeholder="Last Name" 
                    value={lastName}
                    onChange={this.handleChange} />
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text" 
                    className="" 
                    placeholder="Email Address" 
                    value={emailAddress}
                    onChange={this.handleChange} />
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="" 
                    placeholder="Password" 
                    value={password}
                    onChange={this.handleChange} />
                  <input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    className="" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.handleChange} />
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign Up</button>
                    <button 
                      className="button button-secondary" 
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.history.push('/');
                      }}>Cancel</button>
                  </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
            </div>
          </div>
        </Fragment> 
        } 
      </UserLog.Consumer>
    )
  }
}
