import { useState } from "react";
import axios from 'axios';
export default function PostCreate() {
    const [title, setTitle] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:4000/posts/create", {
            title,
        });

        setTitle("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="">
                    <label htmlFor="" className="mr-4">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4 bg-white text-black"
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
}
