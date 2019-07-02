import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const NotFound = () => {
  return (
    <Fragment>
    <Header />
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="button" to='/'>Back Home</Link>
    </div>
    </Fragment>
  )
}

export default NotFound;
