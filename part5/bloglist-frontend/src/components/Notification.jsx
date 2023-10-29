import React from 'react'

const error = {
  color: 'red',
  font_size: 30,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const success = {
  color: 'green',
  font_size: 30,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({ errorMessage, successmessage }) => {
  if (successmessage === null && errorMessage === null) {
    return null
  } else if (successmessage) {
    return(
      <div  style={success}>
        {successmessage}
      </div>
    )
  } else {
    return (
      <div  style={error}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification
