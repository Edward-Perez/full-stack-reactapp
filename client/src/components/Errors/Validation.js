import React from 'react'
import PropTypes from 'prop-types'

const Validation = props => {
  const { errorMessages } = props;

  const listItems = () => {
    let key = 0;
    return errorMessages.map(item => {
      // Create Course Component Validation
      if (item.path) {
        const msg = item.path
        const capitalizeMsg = msg.charAt(0).toUpperCase() + msg.slice(1);
        return <li key={key++}>Please provide a value for "{capitalizeMsg}"</li>
      } else {
        // Database Validation Messages
        return <li key={key++}>{item}</li>
      }
    })
  }

  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {listItems()}
        </ul>
      </div>
    </div>
  )
}

Validation.propTypes = {
  errorMessages: PropTypes.array.isRequired
}

export default Validation;