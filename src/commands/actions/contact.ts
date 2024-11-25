import { Context } from "telegraf";

export default async function contact(ctx: Context) {
    const chatId = ctx.from?.id;
    if (!chatId || !ctx.message || !("contact" in ctx.message) || !ctx.message.contact) {
        return ctx.reply("No valid contact information found.");
    }
    const phoneNumber = ctx.message.contact.phone_number;
    try {
        const response = await fetch(`http://127.0.0.1:4001/register?chatId=${chatId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNumber }),
        })
        const result = await response.json()
        ctx.reply(result.message);

    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}