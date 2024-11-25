import { Context, Telegraf } from "telegraf";
import { telegram } from "./utils/configs";
import { IUser } from "./types/user";
import { duration } from "./modules/buttons/duration";
import enforceChannelMembership from "./middlewares/enforceChannelMemberShip";
import checkMemberShip from "./commands/actions/checkMemberShip";
import startAction from "./commands/actions/start";
import contact from "./commands/actions/contact";
import myChatMember from "./commands/on/myChatMember";
import info from "./commands/hears/info";
import constants from "./utils/constants";
import messages from "./utils/messages";
import { navigation } from "./modules/buttons/navigation";
const { AMAR_TAMAS, POORSANT } = constants.reports
const bot = new Telegraf(telegram.token);


bot.on("my_chat_member", myChatMember)

// middleWares
bot.action("checkMembership", checkMemberShip)
bot.use(enforceChannelMembership)

// command
bot.start(startAction);

//on 
bot.on("contact", contact);




// hears
bot.hears(constants.INFO, info)

bot.action(`callback_${constants.REPORTS}`, async ctx => {
    await ctx.deleteMessage()
    await ctx.reply(messages.choose_report, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: AMAR_TAMAS, callback_data: `callback_${AMAR_TAMAS}` },
                    { text: POORSANT, callback_data: `callback_${POORSANT}` },
                ],
            ],
            resize_keyboard: true,
        }
    })
})
bot.hears(POORSANT, ctx => {
    console.log("ctx =>", ctx)
})
// Launch the bot
bot.launch();

export default bot
