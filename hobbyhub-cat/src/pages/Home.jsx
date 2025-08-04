// pages/Home.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import './PageStyles.css'

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to HobbyHub</h1>
      <p>Explore new hobbies and connect with others!</p>
    </div>
  )
}

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="page">
      <h1>📚 HobbyHub Feed</h1>
      <Link to="/new" className="btn">+ Create New Post</Link>
      <div className="post-list">
        {posts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content?.slice(0, 100)}...</p>
            <p>👍 {post.upvotes}</p>
          </Link>
        ))}
      </div>
    </div>
  )
