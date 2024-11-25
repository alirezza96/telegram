import { Context } from "telegraf"
import messages from "../../utils/messages"
export default async function myChatMember(ctx: Context) {
    if (!ctx.chat) return
    if (!ctx.myChatMember) return
    const chatId = ctx.chat.id
    const status = ctx.myChatMember.new_chat_member.status
    
    await fetch(`http://127.0.0.1:4001/user?chatId=${chatId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    if (status === "member") {
        await ctx.reply(messages.welcome)
        return
    }
}