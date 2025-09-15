import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin'
import { Projects } from './pages/UserProjects'
import { Bugs } from './pages/ProjectsBugs'
import { Comments } from './pages/BugsComments'
import Signup from './pages/Signup'
import AllProjects from './pages/AllProjects'
import AllBugs from './pages/AllBugs'


function App() {
  const [count, setCount] = useState(0)
   
  return (
    <>
      
     

<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Signin" element={<Signin/>} />
     <Route path="/projects" element={<Projects/>} />
     <Route path="/bugs" element={<Bugs/>} />
     <Route path="/comments" element={<Comments/>} />
      <Route path="/all-projects" element={<AllProjects/>} />
      <Route path="/all-bugs" element={<AllBugs/>} />
     
     
    
  </Routes>
</BrowserRouter>

    </>
  )
}

export default App
