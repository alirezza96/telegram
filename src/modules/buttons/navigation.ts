import constants from "../../utils/constants"

export const navigation = (backTo: string) => [
    { text: constants.navigation.HOME.fullname, callback_data: `callback_${constants.navigation.HOME.shortname}` },
    { text: constants.navigation.BACK.fullname, callback_data: `callback_${backTo}` },
]
