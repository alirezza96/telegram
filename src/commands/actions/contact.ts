import { Context } from "telegraf";
import mainMenu from "./mainMenu";
import { IBotUser } from "../../types/bot";

export default async function contact(ctx: Context) {
    if (!ctx.message || !("contact" in ctx.message) || !ctx.message.contact) {
        return ctx.reply("No valid contact information found.");
    }
    const { id, first_name, last_name, username } = ctx.message.from;
    const phoneNumber = ctx.message.contact.phone_number as string;
    const response = await fetchData({
        id, first_name, last_name, username,
        phoneNumber
    });
    if(response.status === 400){
        return ctx.sendMessage("verification code send to your phone number")
    }
    const result = await response.json();

    console.log("contact response =>", response.status)
    await ctx.reply(`${result.message} - description`);
    return
}




const fetchData = async (body: { phoneNumber: string } & IBotUser) => {
    const { phoneNumber, id } = body
    try {
        return await fetch(`http://127.0.0.1:4001/register?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...body, phoneNumber: phoneNumber.replace("+", "") }),
        })
    } catch (error) {
        console.error("Error processing contact:", error);
        throw new Error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}
