import { commentCreate } from '../../services/posts'
import './Comments.css'
import { useState, useEffect } from 'react'


const Comments = ({ postId, comments }) => {
    //State variables
    const [newComment, setNewComment] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [Comments, setComments] = useState(comments)

    //Use Effect
    useEffect(() => {
        if (comments) {
            setComments(comments)
        }
    }, [comments])

    //Functions
    const handleCreateComment = async () => {
        setSuccessMsg('')
        setErrorMsg('')

        if (newComment.trim() === '') { return setErrorMsg('Comment cannot be empty') }
        try {
            const formData = { text: newComment }
            const commentResponse = await commentCreate(postId, formData)
            setComments([...Comments, commentResponse.data])

            setNewComment('')
            setSuccessMsg('Thank you for sharing your thoughts')
        } catch (error) {
            setErrorMsg('Something went wrong when creating the comment')
        }
    }


    return (
        <>
            <div id="new-comment-box">
                <div id="comment-div">
                    <textarea name=""id="comment-area" placeholder="Add comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} ></textarea>
                    <button className="action-button" id="make-comment-button" onClick={handleCreateComment}>Submit comment</button>
                </div>
                {errorMsg && <p className="error-message">{`${errorMsg}`}</p>}
                {successMsg && <p className="success-message">{`${successMsg}`}</p>}
            </div >
            <div id="comments-list-box">
                {Comments && Comments.length > 0 ? (
                    Comments.map((comment) => (

                        <div id="old-comment-box" key={comment._id}>
                            <div id="comment-details">
                                <span>{comment.owner.username} </span>
                                <span>{new Date(comment.date).toLocaleString()}</span>
                            </div>
                            <p>{comment.text} </p>
                        </div>
                    )

                    )

                ) : (
                    <p>Make the first comment!</p>
                )}

            </div>

        </>
    )
}
export default Comments