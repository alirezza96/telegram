import { Context } from "telegraf"
import mainMenu from "./mainMenu"
export default async function navigationHome(ctx: Context) {
    await ctx.answerCbQuery()
    if (ctx.callbackQuery && ctx.callbackQuery.message && ctx.callbackQuery.message.message_id) {
        const messageId = ctx.callbackQuery.message.message_id;
        await ctx.deleteMessage(messageId)
    }
    await mainMenu(ctx)
} 