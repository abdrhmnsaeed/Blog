import { useEffect, useState } from "react";
import Input from "./Input";
import "../App.css";

function DisplayBlog() {
    const [blog, setBlog] = useState([]);
    const [post, setPost] = useState({
        id: "",
        date: new Date().toLocaleDateString(),
        topic: "",
        author: "",
        article: "",
        comments: []
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!post.topic || !post.author || !post.article) {
            setError("All fields are required.");
            return;
        }

        const newBlog = [...blog, { ...post, id: Date.now().toString(), comments: [] }];
        setBlog(newBlog);
        localStorage.setItem("blogPosts", JSON.stringify(newBlog));
        setSubmitted(true);
        setError("");
        setPost({
            id: "",
            date: new Date().toLocaleDateString(),
            topic: "",
            author: "",
            article: "",
            comments: []
        });
    };

    useEffect(() => {
        const storedBlog = localStorage.getItem("blogPosts");
        if (storedBlog) {
            const parsedBlog = JSON.parse(storedBlog);
            const updatedBlog = parsedBlog.map(post => ({
                ...post,
                comments: post.comments || []
            }));
            setBlog(updatedBlog);
        }
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleBackClick = () => {
        setSelectedPost(null);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if (!comment.trim()) {
            setError("Comment cannot be empty.");
            return;
        }

        const updatedBlog = blog.map((p) =>
            p.id === selectedPost.id ? { ...p, comments: [...p.comments, comment] } : p
        );

        setBlog(updatedBlog);
        localStorage.setItem("blogPosts", JSON.stringify(updatedBlog));
        setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, comment] });
        setComment("");
        setError("");
    };

    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <Input type="hidden" name="date" value={post.date} onChange={handleChange} />
                    <Input label="Topic" name="topic" value={post.topic} onChange={handleChange} />
                    <Input label="Author" name="author" value={post.author} onChange={handleChange} />
                    <Input label="Article" name="article" value={post.article} onChange={handleChange} />

                    {error && <p className="error">{error}</p>}
                    <button type="submit">Post</button>
                </form>
            </div>

            {selectedPost ? (
                <div className="post-details">
                    <button onClick={handleBackClick}>Back</button>
                    <h1>{selectedPost.topic}</h1>
                    <p>{selectedPost.date}</p>
                    <p>{selectedPost.author}</p>
                    <p>{selectedPost.article}</p>
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
            ) : (
                <div className="blog">
                    {blog.map((data) => (
                        <div className="blog-item" key={data.id} onClick={() => handlePostClick(data)}>
                            <span>{data.date}</span>
                            <h1>{data.topic}</h1>
                            <p>{data.author}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}


export default DisplayBlog;
