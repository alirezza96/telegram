import constants from "../../utils/constants"
const { TODAY, YESTERDAY, THREE_DAYS_AGO, ONE_WEEK_AGO, ONE_MONTH_AGO } = constants.time
const { HOME, BACK } = constants.navigation
export const duration = () => {
    return {
        reply_markup: {
            keyboard: [
                [
                    { text: TODAY },
                    { text: YESTERDAY },
                ],
                [
                    { text: THREE_DAYS_AGO },
                    { text: ONE_WEEK_AGO },
                ],
                [
                    { text: ONE_MONTH_AGO },
                ],
                [
                    { text: HOME },
                    { text: BACK }
                ],
            ]
        }
    }
}