import { orderBy } from "lodash";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import API from "../../api";
import AddComment from "../common/comments/addComment";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((list) => setComments(list));
    }, []);
    const handleSubmit = (comment) => {
        API.comments
            .add({ ...comment, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleDeleteComment = (commentId) => {
        API.comments
            .remove(commentId)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id !== id))
            );
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddComment onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onDelete={handleDeleteComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
