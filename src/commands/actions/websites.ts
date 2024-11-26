import { Context } from "telegraf";
import constants, { websites as links } from "../../utils/constants";
import { navigation } from "../../modules/buttons/navigation";

export default async function websites(ctx: Context) {
    await ctx.deleteMessage()
    await ctx.reply("لیست سامانه ها:", {
        reply_markup: {
            inline_keyboard:
             [...links.map(link => {
                    return [
                        {
                            text: link.fullname,
                            url: link.url
                        }
                    ]
                }), navigation(constants.navigation.HOME.shortname)]
            
        }
    })
}