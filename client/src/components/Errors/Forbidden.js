import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const Forbidden = () => {
  return (
    <Fragment>
    <Header />
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
      <Link className="button" to='/'>Back Home</Link>
    </div>
    </Fragment>
  )
}

export default Forbidden;
