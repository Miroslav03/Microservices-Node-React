import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentList({ id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get(
                `http://localhost:4001/posts/${id}/comments`
            );
            setComments(result.data);
            console.log(result.data, "Comments");
        })();
    }, []);

    return (
        <div>
            <h2>Total Comments:{comments.length}</h2>
            {comments.map((comment) => (
                <>
                    <p key={comment.id}>{comment.content}</p>
                </>
            ))}
        </div>
    );
}
