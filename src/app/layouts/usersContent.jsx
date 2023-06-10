import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/page/userCard/userCard";
import UserEditCard from "../components/page/userCard/userEditCard";
import UsersListPage from "../components/page/usersListPage";

const UsersContent = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId ? (
                edit ? (
                    <UserEditCard />
                ) : (
                    <UserCard userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default UsersContent;
