import { useContext } from "react";
import { BlogContext } from "./DisplayBlog";

function SelectedPost() {
    const {
        error, selectedPost, handleBackClick, comment,
        handleCommentChange, handleCommentSubmit
    } = useContext(BlogContext);

    return (
        <>
            <div className="post-details">
                <button onClick={handleBackClick}>Back</button>
                <h1>{selectedPost.topic}</h1>
                <div className="details">
                    <p>{selectedPost.date}</p>
                    <p className="author">{selectedPost.author}</p>
                </div>
                <p className="article">{selectedPost.article}</p>
                <div className="comments">
                    <h2>Comments</h2>
                    {selectedPost.comments.map((comment, index) => (
                        <p key={index}>{comment}</p>
                    ))}
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            name="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment"
                        ></textarea>
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Submit Comment</button>
                    </form>
                </div>
            </div>


        </>
    );
}

export default SelectedPost;
