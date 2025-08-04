import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useParams, useNavigate } from 'react-router-dom'
import "../css/PostDetail.css";


export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loadingComment, setLoadingComment] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Failed to fetch post:', error.message)
    } else {
      setPost(data)
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Failed to fetch comments:', error.message)
    } else {
      console.log('Fetched comments:', data)  // <-- debug log
      setComments(data)
    }
  }

  async function handleAddComment(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoadingComment(true)

    const user = supabase.auth.user();

    const { error } = await supabase.from('comments').insert([
      {
        post_id: id,
        content: newComment,
        user_id: user ? user.id : null,  // adjust to your auth setup
      },
    ]);


    if (error) {
      console.error('Failed to add comment:', error.message)
      alert('Error: Could not add comment. Check console for details.')
    } else {
      setNewComment('')
      await fetchComments()  // refresh comments to show new comment immediately
    }

    setLoadingComment(false)
  }

  async function handleDeletePost() {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) {
      navigate('/')
    } else {
      alert('Failed to delete post.')
    }
  }

  function handleEditPost() {
    navigate(`/edit/${id}`)
  }

  if (!post) return <p>Loading post...</p>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      {post.image_url && (
        <div className="post-image-container">
          <img
            src={post.image_url}
            alt="Post visual"
            className="post-detail-image"
          />
        </div>
      )}



      {post.content && <p className="mb-4">{post.content}</p>}

      {post.link && (
        <p className="mb-4">
          <a
            href={post.link}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit link
          </a>
        </p>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleEditPost}
          className="bg-yellow-400 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDeletePost}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      <section className="comments-section">
        <h2 className="text-xl font-semibold mb-2">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="border rounded p-2 bg-gray-50 shadow-sm"
              >
                {comment.content}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddComment} className="space-y-2">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loadingComment}
          >
            {loadingComment ? 'Adding...' : 'Add Comment'}
          </button>
        </form>
      </section>
    </div>
  )
}
