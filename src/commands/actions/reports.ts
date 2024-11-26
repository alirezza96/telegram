import { Context } from "telegraf"
import messages from "../../utils/messages"
import constants from "../../utils/constants"
const { AMAR_TAMAS, POORSANT } = constants.reports
import { navigation } from "../../modules/buttons/navigation"
export default async function reports(ctx: Context) {
    await ctx.deleteMessage()
    await ctx.reply(messages.choose_report, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: AMAR_TAMAS.fullname, callback_data: `callback_${AMAR_TAMAS.shortname}` },
                    { text: POORSANT.fullname , callback_data: `callback_${POORSANT.shortname}` },
                ],
                navigation(constants.navigation.HOME.shortname)
            ],
            resize_keyboard: true,
        }
    })
}