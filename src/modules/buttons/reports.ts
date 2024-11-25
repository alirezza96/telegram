import constants from "../../utils/constants"
const { AMAR_TAMAS, POORSANT } = constants.reports
export const reports = () => {
    return {
        reply_markup: {
            keyboard: [
                [
                    { text: AMAR_TAMAS, callback_data: `callback_${AMAR_TAMAS}` },
                    { text: POORSANT , callback_data: `callback_${POORSANT}`},
                ],
            ]
        }
    }
}