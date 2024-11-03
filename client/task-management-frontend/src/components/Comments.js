import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Comments = ({ taskId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/tasks/${taskId}/comments`);
                console.log(response.data);
                
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [taskId]);

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`/api/tasks/${taskId}/comments`, {
                text: newComment,
                userId: user.userId,
            });
            setComments([...comments, response.data[response.data.length - 1]]); // Append new comment
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };    

    return (
        <div className="comments-container mt-4">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p>{comment.text}</p>
                        <small>By {comment.user?.username || 'Unknown'} on {new Date(comment.timestamp).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
            <input
                className="input-group mb-3"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Submit</button>
        </div>
    );
};

export default Comments;
