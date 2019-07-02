import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const ActionBar = props => {
  const { deleteCourse, courseId, matchingId } = props;

  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100"> 
          { 
            matchingId() 
            ? 
            <span>
              <Link className="button" to={`/courses/${courseId}/update`}>Update  Course</Link>
              <button className="button" onClick={deleteCourse}>Delete Course</button>
            </span>
            : null
          }
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  )
}

ActionBar.propTypes = {
  courseId: PropTypes.number.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  matchingId: PropTypes.func.isRequired
}

export default withRouter(ActionBar)
