import { createBrowserRouter } from "react-router-dom"
import Home from "views/Home"
import LayoutHome from "views/layouts/LayoutHome"
import Kucing from "views/Kucing"
import Form from "views/Form"
import Widget from "views/Widget"
import RickAndMorty from "views/RickAndMorty/RickAndMorty"
// commerce
import AuthCommerce from "views/Commerce/Auth/Auth"
import ProductCommerce from "views/Commerce/Product/Product"
// general
import ErrorPage from "views/ErrorPage"
import ProtectedRoute from "./protected-route"


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <LayoutHome />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/kucing/:kucingId",
        element: <Kucing />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/widget",
        element: <Widget />,
      },
      {
        path: "/rick-and-morty",
        element: <RickAndMorty />,
      },
      {
        path: "/commerce",
        element: (
          <ProtectedRoute>
            <ProductCommerce />
          </ProtectedRoute>
        ),
      },
      {
        path: "/commerce/auth",
        element: <AuthCommerce />,
      },
    ],
  },
])

export default router
