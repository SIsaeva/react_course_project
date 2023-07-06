import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UserEditCard from "../components/page/userPage/userEditCard";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const UsersContent = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserEditCard />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default UsersContent;
