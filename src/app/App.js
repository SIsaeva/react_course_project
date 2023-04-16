import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api";

function App() {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToogleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(newUsers);
  };

  return (
    <>
      <div>
        <SearchStatus length={users.length} />
      </div>
      <div>
        <Users
          users={users}
          onDelete={handleDelete}
          onToogleBookMark={handleToogleBookMark}
        />
      </div>
    </>
  );
}

export default App;
