import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Fruit from './pages/Fruit.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router=createBrowserRouter([{
  element:<App />,
  children:
  [
    {
    path:"/",
    element:<Home />
    },
    {
      path:"/about",
      element:<About />
    },
    {
      path:"/fruit",
      element:<Fruit />
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
