import { useState } from "react";
import axios from "axios";
export default function CommentCreate({ id }) {
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:4001/posts/${id}/comments`, {
            content,
        });

        setContent("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col justify-center items-center">
                    <label htmlFor="comment" className="text-black pb-2">
                        New Comment
                    </label>
                    <input
                        name="comment"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-white mb-4 text-black w-[80%]"
                    />
                </div>
                <button>Add</button>
            </form>
        </div>
    );
}
