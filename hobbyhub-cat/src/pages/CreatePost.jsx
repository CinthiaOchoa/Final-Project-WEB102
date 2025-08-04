// pages/CreatePost.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('posts').insert({
      title, content, image_url: imageUrl
    })
    if (!error) navigate('/')
  }

  return (
    <div className="page">
      <h1>📝 Create a New Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" required value={content} onChange={e => setContent(e.target.value)} />
        <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <button type="submit" className="btn">Post</button>
      </form>
    </div>
  )
}
