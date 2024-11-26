import { Context } from "telegraf";

export default async function getPhoneNumber(ctx: Context): Promise<number> {
    const message = await ctx.reply("جهت استفاده از برنامه شماره همراه خود را ارسال کنید", {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "📞 ارسال شماره همراه",
                        request_contact: true
                    },
                ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true, // Close keyboard after user response
        },
    });


    return message.message_id
}