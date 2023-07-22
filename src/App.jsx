import React from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import AddEdit from './pages/AddEdit'

import View from './pages/View'
import About from './pages/About'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header'

const App = () => {
  return (
    <>
    <Header/>
    <div className='App'>
    <ToastContainer />
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/add" element={<AddEdit/>}></Route>
      <Route path="/update/:id" element={<AddEdit/>}></Route>
      <Route path="/view/:id" element={<View/>}></Route>
      <Route path="/about" element={<About/>}></Route>
   
      </Routes>
    
    </div>

    </>
  )
}

export default App