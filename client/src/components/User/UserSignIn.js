import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Component 
import Header from '../Header/Header'

// Context 
import { UserLog } from '../Context/UserLog'

export default class UserSignIn extends Component {
  constructor() {
    super()
    this.state = {
      emailAddress: '',
      password: '',
      statusCode: null
    }
  }

  // Updates State with input values
  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value 
    });
  }

  // UserLog Context
  updateStatus = async UserLog => {
    await UserLog.userSignIn(this.state)
  }

  // Sign In Form // Reset/Set State from localStorage values that updateStatus() has set for us
  handleSubmit = () => {
    let status = null;
    if(localStorage.getItem('status')) {
      status = JSON.parse(localStorage.getItem('status')).status;
      this.setState({
        emailAddress: '',
        password: '',
        statusCode: status
      })
    }
  }

  render() {
    const { emailAddress, password, statusCode } = this.state;

    return (
      <UserLog.Consumer>
        { value => 
        <Fragment>
          { statusCode === 200 ? this.props.history.goBack() : null }
          { statusCode === 500 ? <Redirect to="/error" /> : null }
          { statusCode === 404 ? <Redirect to="/notfound" /> : null }
        <Header />
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In </h1>
            {
            value.state.status === 401
            ? <h2>Incorrect Email or Password</h2>
            : null 
            }
            <div>
              <form onSubmit={ async event => {
                event.preventDefault();
                await this.updateStatus(value);
                await this.handleSubmit(event);
              }}>
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
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <button 
                    className="button button-secondary" 
                    onClick={ event => {
                      event.preventDefault();
                      this.props.history.goBack();
                  }}>Cancel</button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
          </div>
        </div>
        </Fragment>
        }
      </UserLog.Consumer>
    )
  }
}