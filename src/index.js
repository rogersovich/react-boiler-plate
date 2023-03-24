import React from "react"
import ReactDOM from "react-dom/client"
import "./css/index.css"
import "./css/tailwind.css"
// import App from './App';
import reportWebVitals from "./reportWebVitals"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { store, persistor } from "./store"
import { ChakraProvider } from "@chakra-ui/react"
// service
import { Provider } from "react-redux"
import { PersistGate } from "reduxjs-toolkit-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
