import { Context } from "telegraf";
import { duration } from "../../modules/buttons/duration";

export default async function reportInput(fullname: string, shortname: string, ctx: Context) {
    await ctx.deleteMessage()
    await ctx.answerCbQuery()
    ctx.reply(`گزارش: ${fullname} \n دوره گزارش را مشخص کنید`, {
        reply_markup: {
            inline_keyboard: duration(shortname)
        }
    })
}
