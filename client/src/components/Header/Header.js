import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  // Retrieve "auth" key values from Local Storage if present
  const authUser = JSON.parse(localStorage.getItem('auth'));
  
  return (
    <Fragment>
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {
            authUser
          ? <Fragment>
            <span className='signin'>{`Welcome ${authUser.user.firstName} ${authUser.user.lastName}`}</span> 
            <Link className='signup' to='/signout'>Sign Out</Link> 
            </Fragment>
          : <Fragment>
            <Link className='signin' to='/signin'>Sign In</Link>
            <Link className='signup' to='/signup'>Sign Up</Link>
            </Fragment>
          }
        </nav>
      </div>
    </div>
    <hr />
    </Fragment>
  )
}

export default Header;