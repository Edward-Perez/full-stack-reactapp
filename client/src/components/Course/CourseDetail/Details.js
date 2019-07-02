import React from 'react'
import PropTypes from 'prop-types'


const Details = props => {
  const { title, description, firstName, lastName } = props;

  return (
    <div className="bounds course--detail">
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{`${title}`}</h3>
          <p>By {`${firstName} ${lastName}`}</p>
        </div>
        <div className="course--description">
          {description}
        </div>
      </div>
    </div>
  )
}

Details.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
}

export default Details;
