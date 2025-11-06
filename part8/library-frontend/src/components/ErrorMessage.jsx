import { useEffect } from 'react'

const ErrorMessage = ({ errorMessage, setErrorMessage }) => {

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  };

  useEffect(() => {
    if (errorMessage) { notifyError(errorMessage); }
  }, [errorMessage]);

  return errorMessage ? (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
  :
  null;

};

export default ErrorMessage;
