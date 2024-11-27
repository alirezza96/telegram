import constants from "../../utils/constants";
export default function btn_mainMenu() {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: constants.navigation.WEBSITES.fullname, callback_data: `callback_${constants.navigation.WEBSITES.shortname}`
                    },
                    {
                        text: constants.navigation.REPORTS.fullname, callback_data: `callback_${constants.navigation.REPORTS.shortname}`
                    },
                ],
                [
                    {
                        text: constants.navigation.PROFILE.fullname, callback_data: `callback_${constants.navigation.PROFILE.shortname}`
                    },
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true, // Close keyboard after user response
        },
    }
}