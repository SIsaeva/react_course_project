import React, { useState, useEffect } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import QualitiesList from "../../UI/qualities/qualitiesList";

const UserCard = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();
    const handleUserEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h4>Встретился раз: {user.completedMeetings}</h4>
                <h3>Оценка: {user.rate}</h3>
                <button
                    onClick={() => {
                        handleUserEdit();
                    }}
                >
                    Изменить
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
