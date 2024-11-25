import constants from "../../utils/constants"
const { HOME, BACK } = constants.navigation
export const navigation = [
    { text: HOME, callback_data: `callback_${HOME}` },
    { text: BACK, callback_data: `callback_${BACK}` },
]
