export const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const typeToReadable = (type: string) => {
    switch (type) {
        case "SICKNESS":
            return "Sickness";
        case "ANNUAL_LEAVE":
            return "Annual Leave";
        case "MEDICAL":
            return "Medical";
        default:
            return "Unknown";
    }
};
