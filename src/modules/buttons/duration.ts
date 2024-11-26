import constants from "../../utils/constants"
import { navigation } from "./navigation"
const { TODAY, YESTERDAY, THREE_DAYS_AGO, ONE_WEEK_AGO, ONE_MONTH_AGO } = constants.time
export const duration = (shortname: string) => {
    console.log("shortname =>", shortname)
    return [
        [
            { text: TODAY.fullname, callback_data: `callback_${shortname}_${TODAY.shortname}` },
            { text: YESTERDAY.fullname, callback_data: `callback_${shortname}_${YESTERDAY.shortname}` },
        ],
        [
            { text: THREE_DAYS_AGO.fullname, callback_data: `callback_${shortname}_${THREE_DAYS_AGO.shortname}` },
            { text: ONE_WEEK_AGO.fullname, callback_data: `callback_${shortname}_${ONE_WEEK_AGO.shortname}` },
        ],
        [
            { text: ONE_MONTH_AGO.fullname, callback_data: `callback_${shortname}_${ONE_MONTH_AGO.shortname}` },
        ],
        navigation(constants.navigation.REPORTS.shortname)
    ]
}
//