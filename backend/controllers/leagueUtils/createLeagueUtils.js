export function checkLeagueParams(leagueObject) {

    console.log(leagueObject)

    /**
    Make sure end date is at least a month after the start date
    Make sure team registration date is at least a week from today’s date
    Make sure start date and end date are on the same day of the week
     */

    let cond1 = isTimeBetweenDatesOneMonth()
    let cond2 = isRegDateWeekFromToday()
    let cond3 = areDatesOnSameDay()

    return cond1 && cond2 && cond3
}

/**
 * Checks whether two given dates are at least a month apart
 * @param {String} date1 First date
 * @param {String} date2 Second date
 */
function isTimeBetweenDatesOneMonth(date1, date2) {

}

/**
 * Checks whether a date is a week from today
 * @param {String} date 
 */
function isDateWeekFromToday(date) {

}

/**
 * Checks whether two dates are on the same day of the week
 * @param {String} date1 
 * @param {String} date2 
 */
function areDatesOnSameWeekday(date1, date2) {

}