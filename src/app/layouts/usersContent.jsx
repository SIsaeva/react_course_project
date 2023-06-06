import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/page/userCard/userCard";
import UsersListPage from "../components/page/usersListPage";

const UsersContent = () => {
    const { userId } = useParams();

    return <>{userId ? <UserCard userId={userId} /> : <UsersListPage />}</>;
};

export default UsersContent;
