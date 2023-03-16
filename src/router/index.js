import { createBrowserRouter } from "react-router-dom"
import Home from "../views/Home"
import Kucing from "../views/Kucing"
import Form from "../views/Form"
import ErrorPage from "../views/ErrorPage"
import ProtectedRoute from "./protected-route"

var isLogin = localStorage.getItem("web-key")

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/kucing/:kucingId",
        element: (
          <ProtectedRoute user={isLogin}>
            <Kucing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/form",
        element: <Form />,
      },
    ],
  },
])

export default router
