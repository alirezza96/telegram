import { Context } from "telegraf";
import { navigation } from "../../modules/buttons/navigation"
import constants from "../../utils/constants"
export default async function reportResult(report: { shortname: string, fullname: string }, time: { shortname: string, fullname: string }, ctx: Context) {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    console.log("report =>", report)
    console.log("time =>", time)
    await ctx.reply(`گزارش: ${report.fullname} \n زمان: ${time.fullname}`, {
        reply_markup: {
            inline_keyboard: [navigation(constants.navigation.REPORTS.shortname)]
        }
    })
}