import React from 'react'
import { useState } from 'react';



const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [liked, setLiked] = useState([]);

  /* handle */
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { text: newComment, id: Date.now(), likes: 0 } // likes 필드 추가
      ]);
      setLiked((prevLiked) => [...prevLiked, false]);
      setNewComment("");
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditText(comments[index].text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[editIndex].text = editText;
        return updatedComments;
      });
      setEditIndex(null);
      setEditText("");
    }
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
    setLiked((prevLiked) => prevLiked.filter((_, i) => i !== index));
  };

  const toggleLike = (index) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index
          ? { ...comment, likes: comment.likes + 1 } // 좋아요 수 증가
          : comment
      )
    );
  };

  return (
    <div className='commentWrap'>
      <button className='commentToggleBtn' onClick={toggleComments}>{showComments ? '댓글 숨기기' : '댓글 보기'}</button>
      {showComments && (
        <div>
          <ul className='commentList'>
            {comments.map((comment, index) => (
              <li key={comment.id}>
              <div className='commentContent'>
                {editIndex === index ? (
                  <div className='commentContentWrap'>
                  <input type="text"
                  value = {editText}
                  onChange={(e) => setEditText(e.target.value)} />
                  <button className='commentAddBtn' onClick={handleSaveEdit}>저장</button>
                  </div>
                ) : (
                  <div className='commentListWrap'>
                  <p>{comment.text}</p>
                    <div className="likeBtnWrap">
                      <button
                        onClick={() => toggleLike(index)}
                        className={comment.likes > 0 ? 'likeBtn liked' : 'likeBtn'}
                      >
                        {comment.likes > 0 ? '💖' : '🤍'}
                      </button>
                      <span className="likeCount">{comment.likes}</span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <span className='editBtn' onClick={() => handleEditComment(index)}>수정</span>
                <span className='deleteBtn' onClick={() => handleDeleteComment(index)}>삭제</span>
              </div>
            </li>
            ))}
          </ul>
          <div className="reply">
            <input type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='댓글을 입력하세요.'/>
            <button className='commentAddBtn' onClick={handleAddComment}>댓글 추가</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentSection