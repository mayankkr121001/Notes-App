import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import HomePage from './components/HomePage'
import NotesPage from './components/NotesPage'
import ProfilePage from './components/ProfilePage'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/notes" element={<NotesPage />}/>
      <Route path="/profile" element={<ProfilePage />}/>
    </Routes>
    </>
  )
}

export default App