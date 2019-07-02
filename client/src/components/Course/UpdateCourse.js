import React, { Component, Fragment } from 'react'
import axios from 'axios'

// Components
import Header from '../Header/Header'
import Validation from '../Errors/Validation'

export default class UpdateCourse extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('auth')).user,
      courseOwnerId: null,
      courseId: null,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errorMessages: null
    }
  }

  // Gather courses/:id param, run API call func with param
  componentDidMount() {
    const courseId = this.props.match.params.id;
    this.getCourses(courseId);
  }
  
  // API Call to retrieve a course from database
  getCourses = courseId => {
    axios.get(`http://localhost:5000/api/courses/${courseId}`)
      .then(response => {
        const courseOwnerId = response.data.User.id;
        const course = response.data;
        const { title, description, estimatedTime, materialsNeeded } = course;
        this.setState({
          courseOwnerId,
          courseId,
          title,
          description,
          estimatedTime,
          materialsNeeded
        })
      })
      .then(() => {
        // Validate Current User Id to Course Id
        const currentUserId = this.state.currentUser.id;
        const { courseOwnerId } = this.state;
        if (currentUserId !== courseOwnerId) {
          this.props.history.push('/forbidden');
        }
      })
      .catch( error => {
        if (error.response.status === 500) {
          this.props.history.push('/error');
        } else {
        this.props.history.push('/notfound');
        }
      });
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
    const { currentUser, courseId, title, description, 
      estimatedTime, materialsNeeded } = this.state;

    axios({
      method: 'put',
      url: `http://localhost:5000/api/courses/${courseId}`,
      auth: {
        username: currentUser.username,
        password: currentUser.password
      },
      data: { title,
          description,
          estimatedTime,
          materialsNeeded } 
      })
      .then( () => {
        this.props.history.push('/');
      })
      .catch( error => {
        const statusCode = error.response.status;
        const errorMessages = error.response.data.message;
        if (statusCode === 400) {
          this.setState({ errorMessages: [errorMessages] });
        } else if (statusCode === 500) {
          this.props.history.push('/error');
        } else {
          this.props.history.push('/notfound');
        }
      })
  }

  render() {
    const { currentUser, title, description,
      estimatedTime, materialsNeeded, errorMessages } = this.state;

    return (
      <Fragment>
        <Header />
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            {
              errorMessages 
              ? <Validation errorMessages={errorMessages} />
              : null
            }
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
                  <p>By {currentUser.firstName} {currentUser.lastName}</p>
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
                  type="submit">Update Course</button>
                <button 
                  className="button button-secondary" 
                  onClick={event => {
                    event.preventDefault();
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

