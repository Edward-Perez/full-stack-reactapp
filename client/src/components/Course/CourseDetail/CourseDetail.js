import React, { Component, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'


// Components
import Header from '../../Header/Header'
import ActionBar from './ActionBar'
import CourseStats from './CourseStats'
import Details from './Details'

export default class CourseDetail extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: {},
      courseOwner: {},
      course: [],
      loading: true
    }
  }
  // Set State if User is currently log In / call getCourse func
  componentDidMount() {
    const id = this.props.match.params.id;
    if(localStorage.getItem('auth')) {
      this.setState({currentUser: JSON.parse(localStorage.getItem('auth')).user})
    }
    this.getCourse(id);
  }

  // Retrieve course from database
  getCourse = id => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        const course = response.data;
        this.setState({
          courseOwner: course.User,
          course: course,
          loading: false 
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/notfound');
        } else {
          this.props.history.push('/error');
        }
      })
  }

  // Delete course from database
  deleteCourse = () => {
    const courseId = this.state.course.id
    axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/courses/${courseId}`,
      auth: {
        username: this.state.currentUser.username,
        password: this.state.currentUser.password
      }
    })
    .then(() => this.props.history.push('/'))
    .catch(error => {
      if (error.response.status === 404) {
        this.props.history.push('/notfound');
      } else {
        this.props.history.push('/error');
      }
    })
  }

  // Determines if ActionBar should display update/delete buttons 
  matchingId = () => {
    const { currentUser, courseOwner } = this.state;
    if(currentUser) {
      return currentUser.id === courseOwner.id ? true : false;
    } else { 
      return false;
    }
  }

  // 
  render() {
    const { loading } = this.state;
    const { firstName, lastName } = this.state.courseOwner;
    const { title, description, estimatedTime, materialsNeeded } = this.state.course;

    const markdown = {
      description: <ReactMarkdown source={description} />,
      materialsNeeded: <ReactMarkdown source={materialsNeeded} />
    }

    if (loading) {
      return ( <h1>Loading...</h1> )
    }

    return (
      <Fragment>
        <Header />
        <ActionBar 
          matchingId={this.matchingId}
          courseId={this.state.course.id}
          deleteCourse={this.deleteCourse} />
        <Details 
          markdown={markdown}
          title={title} 
          description={markdown.description} 
          estimatedTime={estimatedTime} 
          materialsNeeded={materialsNeeded}
          firstName={firstName}
          lastName={lastName} /> 
        <CourseStats 
          estimatedTime={estimatedTime}
          materialsNeeded={markdown.materialsNeeded} />
      </Fragment>
    )
  }
}
