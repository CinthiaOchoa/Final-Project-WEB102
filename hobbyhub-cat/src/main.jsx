import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import your components/pages
import App from './App'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import './index.css'


// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="new" element={<CreatePost />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
