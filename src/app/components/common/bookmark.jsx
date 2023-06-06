import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onClick, ...rest }) => {
    return (
        <>
            <button onClick={onClick}>
                <i
                    className={
                        "bi " +
                        (status
                            ? "bi-bookmark-check-fill"
                            : "bi-bookmark-check")
                    }
                ></i>
            </button>
        </>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Bookmark;
