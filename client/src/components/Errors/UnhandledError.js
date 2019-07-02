import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const UnhandledError = () => {
  return (
    <Fragment>
    <Header />
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link className="button" to='/'>Back Home</Link>
    </div>
    </Fragment>
  )
}

export default UnhandledError;