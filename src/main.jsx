import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import ErrorPage from "./ErrorPage.jsx";
import Login from "./routes/Login";
import Register from "./routes/Register"
import Notes from "./routes/Notes";
import Root from "./routes/Root";
import ChangePassword from './routes/ChangePassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Notes />
      },
      {
        path: "/login",
        element: <Login />
      
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/changePassword",
        element: <ChangePassword />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
