import React from 'react'
import PropTypes from 'prop-types'

const CourseStats = props => {
  const { estimatedTime, materialsNeeded } = props;

  return (
    <div className="grid-25 grid-right">
      <div className="course--stats">
        <ul className="course--stats--list">
          <li className="course--stats--list--item">
            <h4>Estimated Time</h4>
            <h3>{estimatedTime}</h3>
          </li>
          <li className="course--stats--list--item">
            <h4>Materials Needed</h4>          
            {materialsNeeded}
          </li>
        </ul>
      </div>
    </div>
  )
}

CourseStats.propTypes = {
  estimatedTime: PropTypes.string,
  materialsNeeded: PropTypes.element.isRequired
}

export default CourseStats;
