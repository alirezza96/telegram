import { Context } from "telegraf";
import mainMenu from "./mainMenu";
export default async function contact(ctx: Context) {
    console.log("ctx message id", ctx)
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
        if (response.status === 200) {
            await mainMenu(ctx)
            return
        }
        const result = await response.json()
        await ctx.reply(result.message);

    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}