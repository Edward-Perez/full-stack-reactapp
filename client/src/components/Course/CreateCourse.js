import React, { Component, Fragment } from 'react'
import axios from 'axios'

// Components
import Header from '../Header/Header'
import Validation from '../Errors/Validation'

export default class CreateCourse extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('auth')).user,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errorMessages: null
    }
  }

  // Updates State with input values
  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value 
    });
  }

  // Form submission
  handleSubmit = event => {
    event.preventDefault();
    const { 
      title, 
      currentUser,
      description,
      estimatedTime,
      materialsNeeded } = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/courses',
      auth: {
        username: currentUser.username,
        password: currentUser.password
      },
      data: { 
        title,
        description,
        estimatedTime,
        materialsNeeded 
        } 
      })
      .then( () => this.props.history.push('/'))
      .catch( error => {
        const statusCode = error.response.status;
        const errorMessages = error.response.data.error.type;
        if (statusCode === 400) {
          this.setState({ errorMessages });
        } else if (statusCode === 500) {
          this.props.history.push('/error');
        } else {
          this.props.history.push('/notfound');
        }
      });
  }

  render() {
    const { currentUser, title, description, estimatedTime,
      materialsNeeded, errorMessages } = this.state;

    return (
      <Fragment>
        <Header />
        {
          errorMessages
          ? <Validation errorMessages={errorMessages} /> 
          : null 
        }
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  
                  <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    className="input-title course--title--input" 
                    placeholder="Course title..."
                    value={title} 
                    onChange={this.handleChange} />
                  <p>By {`${currentUser.firstName} ${currentUser.lastName}`}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                      id="description" 
                      name="description" 
                      className="" 
                      placeholder="Course description..."
                      value={description}
                      onChange={this.handleChange} >
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input"
                        placeholder="Hours" 
                        value={estimatedTime}
                        onChange={this.handleChange} />
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded" 
                          className="" 
                          placeholder="List materials..."
                          value={materialsNeeded}
                          onChange={this.handleChange} >
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button 
                  className="button" 
                  type="submit">Create Course</button>
                <button 
                  className="button button-secondary" 
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.push('/');
                  }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
      
    )
  }
}