import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

// Component 
import Header from '../Header/Header';

// Context 
import { UserLog } from '../Context/UserLog';

export default class UserSignIn extends Component {
  constructor() {
    super()
    this.state = {
      emailAddress: '',
      password: ''
    }
  }

  // Updates State with input values
  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value 
    });
  }

  render() {
    const { emailAddress, password } = this.state;

    return (
      <UserLog.Consumer>
        { value => 
        <Fragment>
        <Header />
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In </h1>
            {
            value.state.status === 401
            ? <p>Incorrect Email or Password</p>
            : null 
            }
            <div>
              <form onSubmit={ async e => {
                e.preventDefault();
                await value.userSignIn(this.state);
                this.setState({   
                  emailAddress: '',
                  password: ''
                })
                this.props.history.goBack();
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
                    onClick={ (e) => {
                      e.preventDefault();
                      this.props.history.push('/');
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