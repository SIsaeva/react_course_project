import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UserEditCard from "../components/page/userPage/userEditCard";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const UsersContent = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserEditCard />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: `/users/${currentUser._id}/edit`
                                }}
                            />
                        )
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
