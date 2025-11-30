export const getDateForSheet = (date) => {
    const today = date || new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

export const getLongDate = (date) => {
    const today = date || new Date();

    return today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export const roundOff = (num) => {
    return Math.round(num * 100) / 100;
}

export const formatWorkoutHistoryData = (data) => {
    if (!data || (data.length === 0)) return;
    
    data.forEach((item, idx) => {
        item[0] = getLongDate(new Date(item[0]));
    });
    
    return data.reverse();
}