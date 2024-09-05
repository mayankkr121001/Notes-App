import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from './utils/ProtectedRoute.jsx'

import HomePage from './components/HomePage'
import NotesPage from './components/NotesPage'
import ProfilePage from './components/ProfilePage'
import NoteOpened from './components/NoteOpened'

function App() {


  return (

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/yournote" element={<NoteOpened />} />
        <Route path="*" />
      </Route>

    </Routes>

  )
}

export default App