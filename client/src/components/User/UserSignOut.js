import React from 'react'
import { Redirect } from 'react-router-dom'

// Context 
import { UserLog } from '../Context/UserLog'

const UserSignOut = () => {
  const context = React.useContext(UserLog);
  context.userSignOut();
  return(
    <Redirect to='/' />
  )
}

export default UserSignOut
