import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Components
import Header from '../../Header/Header'
import CourseItem from './CourseItem'

export default class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    }
  }

  // Makes API call once mounted
  componentDidMount() {
    this.allCourses();
  }

  // Retrieve all courses from database
  allCourses = () => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        this.setState({
          courses: response.data.courses
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/notfound');
        } else {
          this.props.history.push('/error');
        }
      });
  }

  render() {

    return (
      <Fragment>
        <Header />
        <div className="bounds">

          {/* List of Courses */}
          {this.state.courses.map(course =>
            <CourseItem 
              id={course.id}
              key={course.id}
              title={course.title} /> )
          }

          {/* New Course  */}
          <div className="grid-33">
            <Link className="course--module course--add--module" to="courses/create">
              <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
            </Link>
          </div>
          
        </div>
      </Fragment>
    )
  }
}
