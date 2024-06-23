import { useContext } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import { BlogContext } from "./DisplayBlog";

function AddPost() {
    const { handleSubmit, error, handleChange, post, selectedPost } = useContext(BlogContext);

    return (
        <>
            {!selectedPost &&
                < div className="form-container">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <Input type="hidden" name="date" value={post.date} onChange={handleChange} />
                            <Input label="Topic" name="topic" value={post.topic} onChange={handleChange} />
                            <Input label="Author" name="author" value={post.author} onChange={handleChange} />
                            <Textarea label="Article" name="article" value={post.article} onChange={handleChange} place="Write your article here..." />

                            {error && <p className="error">{error}</p>}
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </div >
            }
        </>

    );
}

export default AddPost;
