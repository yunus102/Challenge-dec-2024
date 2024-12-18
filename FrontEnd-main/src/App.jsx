import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "../src/service/auth.service.js"
import {login, logout} from "./store/authSlice"
import { Header } from './components'
import { Outlet , useLocation, useNavigate} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  }

  return !loading ? (
    <div className='w-full min-h-screen m-0 flex flex-wrap content-between'>
      <div className='w-full block'>


        {/* Back button */}
        console.log(location.pathname)
        {location.pathname !== '/' && (
          <button
            onClick={handleBack}
            className="back-button"
          >
            Back
          </button>
        )}
 
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  ) : null
}

export default App