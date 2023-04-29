import React, { useEffect, useState } from "react";
import Users from "./components/users";
import API from "./api";

function App() {
    const [allUsers, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    console.log(allUsers); // undefined

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
            <Users
                users={allUsers}
                onDelete={handleDelete}
                onToogleBookMark={handleToogleBookMark}
            />
        </>
    );
}

export default App;
