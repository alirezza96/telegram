import moment from "moment-jalaali"

export const persianDate = (diff: moment.DurationInputArg1, unit: moment.DurationInputArg2): string => {
    return moment().subtract(diff, unit).format("jYYYY/jMM/jDD")
}