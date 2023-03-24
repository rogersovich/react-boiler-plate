import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children }) => {

  const { token } = useSelector((state) => state.auth)
  
  if (!token) {
    return <Navigate to="/commerce/auth" replace />
  }

  return children
}

export default ProtectedRoute
