import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import API from "../../../api";
import { validator } from "../../../utils/validator";

const UserEditCard = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        if (target.name === "profession") {
            setUser((prevState) => ({
                ...prevState,
                [target.name]: transformSelectProfession(target.value)
            }));
        } else {
            if (target.name === "qualities") {
                setUser((prevState) => ({
                    ...prevState,
                    [target.name]: transformSelectQualities(target.value)
                }));
            } else {
                setUser((prevState) => ({
                    ...prevState,
                    [target.name]: target.value
                }));
            }
        }
    };

    const handleUserUpdate = () => {
        API.users.update(userId, user).then((data) => setUser(data));
        history.push(`/users/${userId}`);
    };

    const transformUserQualities = (userQualities) => {
        return Object.keys(userQualities).map((item) => ({
            label: userQualities[item].name,
            value: userQualities[item]._id,
            color: userQualities[item].color
        }));
    };
    const transformUserProfession = (userProfession) => {
        return userProfession._id;
    };
    const transformSelectProfession = (selectProfession) => {
        return {
            _id: selectProfession,
            name: professions.find((item) => item.value === selectProfession)
                .label
        };
    };
    const transformSelectQualities = (selectQualities) => {
        return Object.keys(selectQualities).map((item) => ({
            name: selectQualities[item].label,
            _id: selectQualities[item].value,
            color: selectQualities[item].color
        }));
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return 0;
    };
    const isValid = Object.keys(errors).length === 0;
    if (user && professions) {
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
                                    value={transformUserProfession(
                                        user.profession
                                    )}
                                    options={professions}
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
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                    defaultValue={transformUserQualities(
                                        user.qualities
                                    )}
                                />
                                <button
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                    onClick={handleUserUpdate}
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
