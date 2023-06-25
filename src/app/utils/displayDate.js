export function formatDate(date) {
    const currentDate = new Date();
    const dateForDisplay = new Date(parseInt(date));
    if (dateForDisplay.getFullYear() < currentDate.getFullYear()) {
        return `${dateForDisplay.getDate()}.${dateForDisplay.getMonth()}.${dateForDisplay.getFullYear()}`;
    } else {
        if (
            (dateForDisplay.getMonth() === currentDate.getMonth() &&
                dateForDisplay.getDate() < currentDate.getDate()) ||
            dateForDisplay.getMonth() !== currentDate.getMonth()
        ) {
            return `${dateForDisplay.getDate()}${dateForDisplay.toLocaleString(
                "default",
                { month: "long" }
            )}`;
        } else {
            if (
                dateForDisplay.getHours() < currentDate.getHours() ||
                currentDate.getMinutes() - dateForDisplay.getMinutes() > 30
            ) {
                return `${dateForDisplay.getHours()}.${dateForDisplay.getMinutes()}`;
            } else {
                if (
                    currentDate.getMinutes() - dateForDisplay.getMinutes() >
                    10
                ) {
                    return "30 минут назад";
                }
                if (
                    currentDate.getMinutes() - dateForDisplay.getMinutes() >
                    5
                ) {
                    return "10 минут назад";
                }
                if (
                    currentDate.getMinutes() - dateForDisplay.getMinutes() >
                    1
                ) {
                    return "5 минут назад";
                }
                if (
                    currentDate.getMinutes() - dateForDisplay.getMinutes() >=
                    0
                ) {
                    return "1 минуту назад";
                }
            }
        }
    }
}
