import "./App.css";
import PostCreate from "./components/postCreate/PostCreate";
import PostList from "./components/postList/PostList";

export default function App() {
    return (
        <>
            <div className="flex gap-6 flex-col">
                <div>
                    <h1 className="mb-6 font-bold">Create Post</h1>
                    <PostCreate />
                </div>
                <div>
                    <h1 className="mb-6 font-bold">Posts</h1>
                    <PostList />
                </div>
            </div>
        </>
    );
}
