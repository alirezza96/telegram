import { Context } from "telegraf";
import getPhoneNumber from "../reply/getPhoneNumber";

export default async function register(ctx: Context) {
    const id = ctx.from!.id
    const response = await fetchUser(id)
    if (response.status === 404) {
        getPhoneNumber(ctx)
        return
    }
    const result = await response.json()
    if (response.status === 400) {
        ctx.sendMessage("verification code send to your phone number (register)")
        return
    }
    console.log("register response =>", response.status)
    ctx.reply(result.message)
    return
}

const fetchUser = async (id: number) => {
    try {
        return await fetch(`http://127.0.0.1:4001/user?id=${id}`)
    } catch (error) {
        throw new Error(`fetch data error => ${error}`)
    }
}