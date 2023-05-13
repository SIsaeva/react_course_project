import React, { useState, useEffect } from "react";
import API from "../api";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useHistory } from "react-router-dom";

const UserCard = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();
    const handleReturnToList = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <span>
                    {user.qualities.map((quality) => (
                        <Qualitie key={quality._id} {...quality} />
                    ))}
                </span>
                <h4>{`Встретился раз: ${user.completedMeetings}`}</h4>
                <h3>{`Оценка: ${user.rate}`}</h3>
                <button
                    onClick={() => {
                        handleReturnToList();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return "loading...";
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
