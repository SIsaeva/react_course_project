import React from "react";

const Bookmark = ({ status, ...rest }) => {
  return (
    <>
      <i
        className={
          "bi " + (status ? "bi-bookmark-check-fill" : "bi-bookmark-check")
        }
      ></i>
    </>
  );
};

export default Bookmark;
