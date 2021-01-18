import React from 'react'

const Notification = ({ notification }) => {
  return notification.isError === true
    ? (<div className="error">{notification.message}</div>)
    : (<div className="notification">{notification.message}</div>)
}

export default Notification