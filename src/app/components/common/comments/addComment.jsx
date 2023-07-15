import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import API from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const AddComment = ({ onSubmit }) => {
    const [data, setData] = useState({ userId: "", content: "" });
    const [users, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        content: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        API.users.fetchAll().then(setUser);
    }, []);
    const clearForm = () => {
        setData({ userId: "", content: "" });
        setErrors({});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const usersArray =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New Comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    name="userId"
                    options={usersArray}
                    defaultOption="Выберите пользователя"
                    value={data.userId}
                    onChange={handleChange}
                    error={errors.userId}
                />
                <TextAreaField
                    name="content"
                    label="Сообщение"
                    placeHolder="Введите сообщение"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddComment.propTypes = {
    onSubmit: PropTypes.func
};

export default AddComment;
