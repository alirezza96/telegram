import { Context } from "telegraf";

export default  function getPhoneNumber(ctx: Context) {
    ctx.reply("for use robot share contact", {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "📞 share contact",
                        request_contact: true
                    },
                ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true, // Close keyboard after user response
        },
    });
}