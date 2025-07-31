import { useEffect } from 'react'

const ErrorMessage = ({ errorMessage, setErrorMessage }) => {

  // const [errorMessage, setErrorMessage] = useState(null)

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  };

  useEffect(() => {
    console.log("changed", errorMessage);
    if (errorMessage) { notifyError(errorMessage); }
  }, [errorMessage]);

  return errorMessage ? (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
  :
  null;

  // const Notify = ({errorMessage}) => {
  //   if ( !errorMessage ) {
  //     return null
  //   }
  //   return (
  //     <div style={{color: 'red'}}>
  //       {errorMessage}
  //     </div>
  //   )
  // }
  
};

export default ErrorMessage;
