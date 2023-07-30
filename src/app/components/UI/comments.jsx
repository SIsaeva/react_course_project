import { orderBy } from "lodash";
import React from "react";
import { useComments } from "../../hooks/useComments";
import AddComment from "../common/comments/addComment";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleSubmit = (comment) => {
        createComment(comment);
    };
    const handleDeleteComment = (commentId) => {
        removeComment(commentId);
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
