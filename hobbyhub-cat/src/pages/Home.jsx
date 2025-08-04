import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import '../css/Home.css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [commentCounts, setCommentCounts] = useState({})

  useEffect(() => {
    fetchPosts()
  }, [sortBy])

    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy === 'popular' ? 'upvotes' : 'created_at', { ascending: false })

      if (!error) {
        console.log('Fetched posts:', data)  // Add this line
        setPosts(data)
      }
    }


  async function fetchCommentCounts(postIds) {
    const { data, error } = await supabase
      .from('comments')
      .select('post_id, id')

    if (!error) {
      const counts = {}
      postIds.forEach(id => {
        counts[id] = data.filter(comment => comment.post_id === id).length
      })
      setCommentCounts(counts)
    }
  }

  const handleLike = async (postId, currentUpvotes) => {
    await supabase
      .from('posts')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', postId)
    fetchPosts()
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const timeAgo = (timestamp) => {
  if (!timestamp) return ''

  const now = new Date()
  let postDate = new Date(timestamp)

  if (isNaN(postDate)) {
    // maybe timestamp is a number (UNIX epoch in seconds)
    if (typeof timestamp === 'number') {
      postDate = new Date(timestamp * 1000)
    } else {
      return ''
    }
  }

    const diffSeconds = Math.floor((now - postDate) / 1000)

    if (diffSeconds < 60) return 'just now'

    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`

    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays <= 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

    return postDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }



  return (
    <div className="home-container">
      <h1 className="page-title">📚 HobbyHub Feed</h1>

      <p className="app-description">
        Welcome to HobbyHub! Here you can share and explore posts all about cats,
        post your favorite cat pictures, tell us about different cat species,  
        or share what you think about our furry friends. Join the community and  
        celebrate everything cat related!
      </p>


      <div className="controls">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>

        <Link to="/new" className="btn">+ Create New Post</Link>
      </div>

      <div className="post-list">
        {filteredPosts.length === 0 && <p>No posts found.</p>}
        {filteredPosts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id} className="post-card-link">
            <div className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image_url && <img src={post.image_url} alt="Post visual" className="post-image" />}
              <p className="timestamp">{timeAgo(post.created_at)}</p>

              <div className="reactions">
                <button onClick={(e) => {
                  e.preventDefault()
                  handleLike(post.id, post.upvotes)
                }}>👍</button>
                <span>{post.upvotes} likes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
