import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    return (
        <>
            <i
                className={
                    "bi " +
                    (status ? "bi-bookmark-check-fill" : "bi-bookmark-check")
                }
            ></i>
        </>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;
