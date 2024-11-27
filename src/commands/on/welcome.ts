import { Context } from "telegraf"
import { ChatMember } from "telegraf/typings/core/types/typegram"



export default async function welcome(ctx: Context) {
    const { status } = ctx.myChatMember?.new_chat_member as ChatMember
    if (status === "member") {
        ctx.sendMessage("welcome boy")
        return
    }
}




