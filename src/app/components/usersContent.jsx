import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "./userCard";
import Users from "./users";

const UsersContent = () => {
    const { userId } = useParams();

    return <>{userId ? <UserCard userId={userId} /> : <Users />}</>;
};

export default UsersContent;
