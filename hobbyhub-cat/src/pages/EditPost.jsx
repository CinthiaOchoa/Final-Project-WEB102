// pages/EditPost.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setContent(data.content)
        setImageUrl(data.image_url)
      }
    }
    fetchPost()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    await supabase.from('posts').update({
      title, content, image_url: imageUrl
    }).eq('id', id)
    navigate(`/post/${id}`)
  }

  return (
    <div className="page">
      <h1>✏️ Edit Post</h1>
      <form onSubmit={handleUpdate} className="form">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  )
}
