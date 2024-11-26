import { Context } from "telegraf";
import { navigation } from "../../modules/buttons/navigation"
import constants from "../../utils/constants"
import { persianDate } from "../../utils/helper";
import moment from "moment-jalaali";
export default async function reportResult(report: { shortname: string, fullname: string }, time: { shortname: string, fullname: string }, ctx: Context) {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    const [amount, unit] = time.shortname.split("_") as [moment.DurationInputArg1, moment.DurationInputArg2]
    const startDate = persianDate(amount, unit)
    const endDate = persianDate(0, "day")
    const reportName = `report_${report.shortname}`
    try {
        const response = await fetch(`http://127.0.0.1:4001/report/${reportName}?chatId=${ctx.from!.id}&startDate=${startDate}&endDate=${endDate}`)
        const result = await response.json()
        const date = startDate !== endDate ? `از تاریخ: ${startDate} تا تاریخ: ${endDate}` : `تاریخ: ${startDate}`
        await ctx.reply(`📃 گزارش: ${report.fullname} \n ⏰ زمان: ${time.fullname} \n ${date} \n \n عملکرد: ${Math.round(result.data.weight).toLocaleString()} کیلوگرم `, {
            reply_markup: {
                inline_keyboard: [navigation(report.shortname)]
            }
        })
    } catch (err) {
        await ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.")
    }
}