import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
    };

    const handleToogleBookMark = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
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
