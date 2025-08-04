import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import '../css/CreatePost.css'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const { data, error } = await supabase.from('posts').insert({
      title,
      content,
      image_url: imageUrl,
      upvotes: 0,
      created_at: new Date()
    })

    if (error) {
      setErrorMsg('Failed to create post: ' + error.message)
    } else {
      setSuccessMsg('✅ Post published successfully!')
      setTitle('')
      setContent('')
      setImageUrl('')
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  return (
    <div className="page">
      <h1>📝 Create a New Post</h1>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className="btn">
          Post
        </button>
      </form>
    </div>
  )
}
