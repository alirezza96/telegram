import { Context, MiddlewareFn } from "telegraf";
import { User } from "telegraf/typings/core/types/typegram";
const isUserExists: MiddlewareFn<Context> = async (ctx, next) => {
    console.log("ctx.message?.from.id =>", ctx.message?.from.id)
    if (!ctx.message?.from.id) {
        return ctx.reply("invalid id")
    }
    const { id }: User = ctx.message.from

    const response = await fetchData(id)
    if (response.status === 404) {
        await ctx.reply("user not found")
        return
    }
    const result = await response.json()
    await ctx.reply(result.message)
    await next()
}




const fetchData = async (id: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:4001/user?id=${id}`)
        return response
    } catch (error) {
        console.error("is User Exists error =>", error)
        throw new Error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
}

export default isUserExists