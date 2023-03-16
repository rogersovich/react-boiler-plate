import React from "react"
import ReactDOM from "react-dom/client"
import "./css/index.css"
import "./css/tailwind.css"
// import App from './App';
import reportWebVitals from "./reportWebVitals"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import store from "./store"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
