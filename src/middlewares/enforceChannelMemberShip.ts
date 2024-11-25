
import { Context, MiddlewareFn } from "telegraf";
import bot from "../bot";
const requiredChannels = [
    { id: 1, name: "@channelalireza96" },
    { id: 2, name: "@channel2alireza96" },
];
const enforceChannelMembership: MiddlewareFn<Context> = async (ctx, next) => {
    try {
        const chatId = ctx.from?.id
        if (!chatId) {
            return ctx.reply("chatId not valid")
        }
        const nonMemberChannels = []
        for (const channel of requiredChannels) {
            try {
                const memberShip = await bot.telegram.getChatMember(channel.name, chatId)
                const memberShipStatus = ["left", "kick"]
                if (memberShipStatus.includes(memberShip.status)) {
                    nonMemberChannels.push(channel)
                }
            } catch (error) {
                console.error("خطا در بررسی کانال", channel.name, "=>", error)
            }
        }
        if (!nonMemberChannels.length) {
            return next()
        }
        await ctx.reply("برای استفاده از ربات میبایست در کانال های زیر عضو شوید", {
            reply_markup: {
                inline_keyboard: [...nonMemberChannels.map(channel => [{ text: channel.name, url: channel.name.replace("@", "t.me/") }]),
                [{ text: "بررسی عضویت", callback_data: "checkMembership" }]
                ]
            }
        })
        } catch (error) {
        console.error("enforceChannelMembership middleware error =>", error);
        await ctx.reply("مشکلی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
};

export default enforceChannelMembership