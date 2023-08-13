function generateAuthError(errorMessage) {
    switch (errorMessage) {
        case "INVALID_PASSWORD":
            return "Введен неверный пароль";
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким email не найден";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много попыток входа.";
    }
}

export default generateAuthError;
