import React, { useEffect, useState } from 'react';
import './Comments.css';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState({});
  const [showComments, setShowComments] = useState(false);  // Show/hide comments state

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        const likeMap = {};
        data.forEach(comment => {
          likeMap[comment.id] = false;
        });
        setLikedComments(likeMap);
      });
  }, [postId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const commentData = {
      postId,
      username: 'keerti_xx',
      text: newComment,
    };

    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(res => res.json())
      .then(newCom => {
        setComments(prev => [...prev, newCom]);
        setLikedComments(prev => ({ ...prev, [newCom.id]: false }));
        setNewComment('');
      });
  };

  const toggleLike = (commentId) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);  // Toggle comments visibility
  };

  return (
    <div className="insta-comments">
      <button onClick={toggleCommentsVisibility} className="view-comments-btn">
        {showComments ? 'Hide Comments' : 'View Comments'}
      </button>

      {showComments && (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-text-section">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-text">{comment.text}</span>
              </div>
              <div
                className={`heart-icon ${likedComments[comment.id] ? 'liked' : ''}`}
                onClick={() => toggleLike(comment.id)}
              >
                {likedComments[comment.id] ? '❤️' : '🤍'}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="comment-input-section">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-btn" onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
}

export default Comments;
