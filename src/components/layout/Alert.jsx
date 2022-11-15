import { useContext } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import AlertContext from '../../context/alert/AlertContext'

const Alert = () => {
  const { alert } = useContext(AlertContext)
  return (
    alert && (
      <div className="flex items-start mb-4 space-x-2">
        {alert.type === 'error' && (
          <FaExclamationCircle color="red" className="mt-1" />
        )}
        <p className="flex-1 text-base font-semibld leading-7">
          <strong>{alert.msg}</strong>
        </p>
      </div>
    )
  )
}

export default Alert
