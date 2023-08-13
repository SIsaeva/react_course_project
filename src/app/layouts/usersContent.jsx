import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UserEditCard from "../components/page/userPage/userEditCard";
import UsersListPage from "../components/page/usersListPage";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { getCurrentUserId } from "../store/users.js";
import UsersLoader from "../components/UI/hoc/usersLoader";
import { useSelector } from "react-redux";

const UsersContent = () => {
    const { userId, edit } = useParams();

    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <UserEditCard />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: `/users/${currentUserId}/edit`
                                }}
                            />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default UsersContent;
