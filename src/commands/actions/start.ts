import { Context } from "telegraf";
import constants from "../../utils/constants";
import { navigation } from "../../modules/buttons/navigation";

export default async function startAction(ctx: Context) {
    try {
        const chatId = ctx.from?.id;
        if (!chatId) {
            return ctx.reply("Chat ID not found.");
        }
        const response = await fetch(`http://127.0.0.1:4001/start?chatId=${chatId}`)
        if (response.status === 404) {
            ctx.reply("جهت استفاده از برنامه شماره همراه خود را ارسال کنید", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "📞 ارسال شماره تلفن",
                                request_contact: true, // Request user's phone number
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true, // Close keyboard after user response

                },

            }
            );
            return
        }
        const result = await response.json();
        ctx.sendMessage(result.message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: constants.INFO, callback_data: `callback_${constants.INFO}`
                        },
                        {
                            text: constants.REPORTS, callback_data: `callback_${constants.REPORTS}`
                        },

                    ],
                    navigation
                ],
                resize_keyboard: true,
                one_time_keyboard: true, // Close keyboard after user response

            },

        });
        // show keyboard buttons without reply



    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}