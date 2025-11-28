export const getDateForSheet = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}

// export const getShortDate = () => {
//     const today = new Date();

//     return today.toLocaleDateString();
// }

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

export const formatData = (data) => {
    const grouped = {};

    for (const row of data) {
        const [date, ...values] = row;

        if (!grouped[date]) {
            grouped[date] = Array(values.length).fill(0);
        }

        values.forEach((v, i) => {
            grouped[date][i] += v;
        });
    }

    return Object.entries(grouped).map(([date, sums]) => [date, ...sums]);
}

export const formatTodaysData = (data) => {
    if (!data || data.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return data.filter((item, idx) => {
        let thisDate = new Date(item[0]);
        thisDate.setHours(0, 0, 0, 0);
        if (today.getTime() === thisDate.getTime()) {
            return item;
        }
    })[0];
}

export const formatWorkoutHistoryData = (data) => {
    if (!data || (data.length === 0)) return;
    const formattedData = formatData(data);
    formattedData.forEach((item, idx) => {
        item[0] = getLongDate(new Date(item[0]));
    });
    
    return formattedData.reverse();
}