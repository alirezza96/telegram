import { Context } from "telegraf";
import enforceChannelMembership from "../../middlewares/enforceChannelMemberShip";
export default async function checkMemberShip(ctx: Context, next = async () => { }) {
    try {
        await ctx.deleteMessage()
        await enforceChannelMembership(ctx, next)
    } catch (error) {
        console.error("خطا در بررسی مجدد عضویت", error)
        await ctx.reply("خطایی در بررسی مجدد رخ داد. لطفاً دوباره تلاش کنید.");
    }
}