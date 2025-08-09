export const offerValidations = () => {
    // normalize date (remove time)
    const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date;
    };

    // check if offer fields are filled
    const isComplete = (offer_price, start_date, end_date) =>
    [offer_price, start_date, end_date].every(
        (field) => field !== "" && field != null
    );

    // compare offers
    const hasChanged = (current, initial) => {
    if (!initial) return isComplete(current.offer_price, current.start_date, current.end_date);
    return (
        current.offer_price !== initial.offer_price ||
        current.start_date !== initial.start_date ||
        current.end_date !== initial.end_date
    );
    };

    // validate offer dates
    const getDateError = (start_date, end_date) => {
    const start = normalizeDate(start_date);
    const end = normalizeDate(end_date);
    const today = normalizeDate(new Date());

    if (!start || !end) return "";

    if (end <= today) return "يجب أن يكون تاريخ نهاية العرض بعد تاريخ اليوم";
    if (end <= start) return "يجب أن يكون تاريخ نهاية العرض بعد تاريخ البداية";

    return "";
    };

    // validate price
    const isPriceInvalidFn = (offer_price, main_price) => {
    if (!offer_price || !main_price) return false;
    return Number(offer_price) >= Number(main_price);
    };

    return {
        hasChanged,
        getDateError,
        isPriceInvalidFn,
        isComplete
    }
}