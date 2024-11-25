import { Context } from "telegraf"
import { IUser } from "../../types/user"

export default async function info(ctx: Context) {
    const chatId = ctx.from!.id
    const response = await fetch(`http://127.0.0.1:4001/user?chatId=${chatId}`)
    const result = await response.json()
    const { code, loginname, sharh }: IUser = result
    ctx.reply(`نام : ${sharh} \n کد کاربری: ${code} \n نام کاربری: ${loginname} \n chatId: ${chatId}`)
}