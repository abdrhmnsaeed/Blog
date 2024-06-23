import React, { useEffect, useState, createContext } from "react";
import "../App.css";
import SelectedPost from "./SelectedPost";

const BlogContext = createContext();

function DisplayBlog({ children }) {
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
        const fetchData = async () => {
            try {
                const response = await fetch('./blog.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                const updatedBlog = data.map(post => ({
                    ...post,
                    comments: post.comments || []
                }));

                setBlog(updatedBlog);
                localStorage.setItem("blogPosts", JSON.stringify(updatedBlog));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch blog posts.');
            }
        };

        fetchData();
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
        <BlogContext.Provider value={{
            blog, error, post, handleSubmit, handleChange,
            selectedPost, handleBackClick, comment, handleCommentChange, handleCommentSubmit, handlePostClick
        }}>
            {children}

            <>
                {selectedPost ? (
                    <SelectedPost />
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
        </BlogContext.Provider>
    );
}

export { DisplayBlog, BlogContext };
