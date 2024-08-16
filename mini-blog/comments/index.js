const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id, content, status: "pending" });

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentCreated",
        data: {
            id: id,
            content,
            postId: req.params.id,
            status: "pending",
        },
    });

    res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", async (req, res) => {
    console.log("Recived event", req.body.type);

    const { type, data } = req.body;

    switch (type) {
        case "CommentModerated": {
            const { postId, id, status, content } = data;
            const comments = commentsByPostId[postId];

            const comment = comments.find((comment) => {
                return comment.id === id;
            });
            comment.status = status;

            await axios.post("http://event-bus-srv:4005/events", {
                type: "CommentUpdated",
                data: {
                    id: id,
                    content,
                    postId: postId,
                    status: status,
                },
            });
            break;
        }
    }

    res.send({});
});

app.listen(4001, () => {
    console.log("Listening on 4001");
});
