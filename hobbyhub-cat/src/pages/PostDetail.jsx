// pages/PostDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      setPost(data)
    }
    fetchPost()
  }, [id])

  async function handleUpvote() {
    await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id)
    setPost({ ...post, upvotes: post.upvotes + 1 })
  }

  if (!post) return <p>Loading...</p>

  return (
    <div className="page">
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt="Post visual" className="post-image" />}
      <p>{post.content}</p>
      <p>👍 {post.upvotes}</p>
      <button onClick={handleUpvote} className="btn">Upvote</button>
      <Link to={`/edit/${post.id}`} className="btn">Edit Post</Link>
      <Link to="/" className="btn">← Back to Home</Link>
    </div>
  )
}
