import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFaild: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addComment: (state, action) => {
            state.entities.push(action.payload);
        },
        addCommentFailed: (state, action) => {
            state.error = action.payload;
        },
        removeComment: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        },
        removeCommentFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFaild,
    addComment,
    addCommentFailed,
    removeComment,
    removeCommentFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFaild(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    try {
        const { content } = await commentService.createComment(data);
        console.log(content);
        dispatch(addComment(content));
    } catch (error) {
        addCommentFailed(error.message);
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(removeComment(commentId));
        }
    } catch (error) {
        removeCommentFailed(error.message);
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;
// export const getCommentById = (commentId) => (state) =>
//     state.comment.entities.find((comment) => comment._id === commentId);

export default commentsReducer;
