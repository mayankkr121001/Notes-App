import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import ProtectedRoute from './utils/ProtectedRoute.jsx'

import HomePage from './components/HomePage'
import NotesPage from './components/NotesPage'
import ProfilePage from './components/ProfilePage'
import NoteOpened from './components/NoteOpened'
// import useAuth from './utils/auth.js'

function App() {
  // const [protectedRoute, setProtectedRoute] = useState(false);
  // const auth = useAuth();
  // useEffect(() => {
  //   if(auth.isAuthenticated){
  //     console.log(auth.isAuthenticated)
  //     setProtectedRoute(true);
  //   }else{
  //     console.log(auth.isAuthenticated)

  //     setProtectedRoute(false);
  //   }
  // })

  // const navigate = useNavigate();


  return (

    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* <Route path="/notes" element={<NotesPage />} /> */}
      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesPage />} />
      </Route>

      {/* {protectedRoute? <Route path="/notes" element={<NotesPage />} />: navigate("/")} */}

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/yournote" element={<NoteOpened />} />
    </Routes>

  )
}

export default App