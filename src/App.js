import "./App.css";
import AddPost from "./components/AddPost";
import { DisplayBlog } from "./components/DisplayBlog";

function App() {
  return (
    <div>
      <DisplayBlog>
        <AddPost />
      </DisplayBlog>
    </div>
  );
}

export default App;
