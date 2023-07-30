import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useQualities } from "../../../hooks/useQuality";
import { useProfessions } from "../../../hooks/useProfession";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const UserEditCard = () => {
    const { userId } = useParams();
    const { updateUser } = useAuth();
    const { getUserById } = useUser();
    const [user, setUser] = useState(getUserById(userId));
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const professionsList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    const qualitiesList = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]:
                target.name === "qualities"
                    ? transformSelectQualities(target.value)
                    : target.value
        }));
    };

    const transformUserQualities = (userQualities) => {
        return userQualities.map((item) => {
            const quality = qualities?.find((q) => q._id === item);
            return {
                label: quality?.name,
                value: quality?._id,
                color: quality?.color
            };
        });
    };

    const transformSelectQualities = (selectQualities) => {
        return selectQualities.map((item) => item.value);
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен некорректно" }
        }
    };
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUser(user);
            history.push(`/users/${userId}`);
        } catch (error) {
            setErrors(error);
        }
    };

    const isValid = Object.keys(errors).length === 0;
    if (user && professions && qualities) {
        return (
            <>
                <button
                    className="btn btn-primary"
                    onClick={() => history.goBack()}
                >
                    <i className="bi bi-caret-left"></i>
                    Назад
                </button>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    onChange={handleChange}
                                    value={user.profession}
                                    options={professionsList}
                                    label="Выберите профессию"
                                    name="profession"
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" }
                                    ]}
                                    value={user.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Пол"
                                />
                                <MultiSelectField
                                    label="Выберите качество"
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    defaultValue={transformUserQualities(
                                        user.qualities
                                    )}
                                />
                                <button
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return "loading...";
};

UserEditCard.propTypes = {
    user: PropTypes.object
};

export default UserEditCard;
