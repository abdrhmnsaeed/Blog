import { useContext } from "react";
import Input from "./Input";
import { BlogContext } from "./DisplayBlog";

function AddPost() {
    const { handleSubmit, error, handleChange, post } = useContext(BlogContext);

    return (
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
    );
}

export default AddPost;
