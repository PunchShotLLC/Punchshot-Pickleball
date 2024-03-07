export function checkLeagueParams(leagueObject) {
    
    /**
    Make sure end date is at least a month after the start date
    Make sure team registration date is at least a week from today’s date
    Make sure start date and end date are on the same day of the week
     */

    let cond1 = isTimeBetweenDatesOneMonth(leagueObject.StartDate, leagueObject.EndDate)
    if (!cond1) {
        return "End date must be at least a month after the start date"
    }
    let cond2 = isDateWeekFromToday(leagueObject.TeamRegistrationDate)
    if (!cond2) {
        return "Team reigstration date must be at least a week from today's date"
    }
    let cond3 = areDatesOnSameWeekday(leagueObject.StartDate, leagueObject.EndDate)
    if (!cond3) {
        return "Start date and end date must be on the same day of the week"
    }

    return "Checks completed"
}

/**
 * Checks whether two given dates are at least a month apart
 * @param {String} date1 First date in the format "yyyy-dd-mm"
 * @param {String} date2 Second date in the format "yyyy-dd-mm"
 * @returns {boolean} true if the dates are at least a month apart, false otherwise
 */
function isTimeBetweenDatesOneMonth(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Assuming a month has 30 days

    return (endDate.getTime() - startDate.getTime()) >= oneMonthInMillis;
}

/**
 * Checks whether a date is a week from today
 * @param {String} date Date in the format "yyyy-dd-mm"
 * @returns {boolean} true if the date is a week from today, false otherwise
 */
function isDateWeekFromToday(date) {
    const targetDate = new Date(date);
    const today = new Date();
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    return (targetDate.getTime() - today.getTime()) >= oneWeekInMillis;
}

/**
 * Checks whether two dates are on the same day of the week
 * @param {String} date1 First date in the format "yyyy-dd-mm"
 * @param {String} date2 Second date in the format "yyyy-dd-mm"
 * @returns {boolean} true if the dates are on the same day of the week, false otherwise
 */
function areDatesOnSameWeekday(date1, date2) {
    const weekday1 = new Date(date1).getDay();
    const weekday2 = new Date(date2).getDay();

    return weekday1 === weekday2;
}
