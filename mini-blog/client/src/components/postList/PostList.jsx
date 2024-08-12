import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "../commentCreate/CommentCreate";
import CommentList from "../commentList/CommentList";
export default function PostList() {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        (async () => {
            const result = await axios.get("http://localhost:4002/posts");
            console.log(result.data);
            setPosts(result.data);
        })();
    }, []);

    return (
        <div className="flex gap-6">
            {Object.values(posts).map((post) => (
                <div
                    className="bg-[#646cff] w-[20rem] h-[auto] py-[2rem] border-white border-solid border-[2px]"
                    key={post.id}
                >
                    <h1 className="text-white text-3xl fotn-bold pt-4">
                        {post.title}
                    </h1>
                    <CommentList comments={post.comments} />
                    <CommentCreate id={post.id} />
                </div>
            ))}
        </div>
    );
}
