import React from "react";

const SearchStatus = ({ length }) => {
  const value = length % 100;
  const statusString =
    (value >= 2 && value <= 4) ||
    (value > 20 && value % 10 >= 2 && value % 10 <= 4)
      ? "человека тусанут"
      : "человек тусанет";

  return (
    <>
      <h2>
        <span className={length === 0 ? "badge bg-danger" : "badge bg-primary"}>
          {length === 0
            ? "Никто с тобой не тусанет"
            : `${length} ${statusString} с тобой сегодня`}
        </span>
      </h2>
    </>
  );
};

export default SearchStatus;
