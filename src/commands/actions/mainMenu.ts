import { Context } from "telegraf";
import constants from "../../utils/constants";
import getPhoneNumber from "../reply/getPhoneNumber";

export default async function mainMenu(ctx: Context) {
    try {
        if (ctx.message && "text" in ctx.message && ctx.message.text === '/start') {
            await ctx.deleteMessage(ctx.message.message_id)
        }
        const chatId = ctx.from!.id;
        const response = await fetch(`http://127.0.0.1:4001/start?chatId=${chatId}`);
        if (response.status === 404) {
            const result = await getPhoneNumber(ctx)
            return
        }
        const result = await response.json();
        if (response.status === 200) {
            await ctx.sendMessage(result.message, {
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
            });
            return;
        }
        await ctx.reply(result.message);
        return
    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}
