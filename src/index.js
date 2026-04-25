import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import App from "./App"
import rootReducer from "./reducer"

const store = configureStore({
  reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#0f172a",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
            },
            success: {
              iconTheme: {
                primary: "#059669",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#db2777",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)