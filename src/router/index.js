import { createBrowserRouter } from "react-router-dom"
import Home from "../views/Home"
import LayoutHome from "../views/layouts/LayoutHome"
import Kucing from "../views/Kucing"
import Form from "../views/Form"
import Widget from "../views/Widget"
import ErrorPage from "../views/ErrorPage"
import ProtectedRoute from "./protected-route"

var isLogin = localStorage.getItem("web-key")

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <LayoutHome/>,
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
      {
        path: "/widget",
        element: <Widget />,
      },
    ],
  },
])

export default router
