import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {  Login } from './components/index.js'
import PrivateRoute from './pages/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup'
//import EditPost from "./pages/EditPost";
import Post from "./pages/Post.jsx";
import AllEmail from "./pages/AllEmail.jsx";
import Analytics from './pages/Analytics.jsx'
import { AuthProvider } from './pages/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                    <Login />
            ),
        },
        {
            path: "/signup",
            element: (

                    <Signup />
            ),
        },
        {
            path: "/emails/all",
            element: (
                    <AllEmail />
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/analytics",
            element:<Analytics/>, 
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)