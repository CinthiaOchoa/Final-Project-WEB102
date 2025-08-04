// App.jsx
import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from './supabase'
import './App.css'


export default function App() {
  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">🏠 Home</Link> | <Link to="/new">✍️ Create Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select().order('created_at', { ascending: false })
    setPosts(data)
  }

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <h3>{post.title}</h3>
          {post.image_url && <img src={post.image_url} width="200" />}
          <p>{post.content}</p>
          <p>👍 {post.upvotes}</p>
          <Link to={`/post/${post.id}`}>View Post</Link>
        </div>
      ))}
    </div>
  )
}

function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await supabase.from('posts').insert([{ title, content, image_url: imageUrl }])
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <br />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <br />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL (optional)" />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [])

  async function fetchPost() {
    const { data } = await supabase.from('posts').select().eq('id', id).single()
    setPost(data)
  }

  async function upvote() {
    await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id)
    fetchPost()
  }

  async function deletePost() {
    await supabase.from('posts').delete().eq('id', id)
    navigate('/')
  }

  if (!post) return <div>Loading...</div>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} width="300" />}
      <p>Upvotes: {post.upvotes}</p>
      <button onClick={upvote}>👍 Upvote</button>
      <br />
      <button onClick={deletePost}>🗑 Delete</button>
    </div>
  )
}
