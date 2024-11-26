import { Telegraf } from "telegraf";
import { telegram } from "./utils/configs";
import enforceChannelMembership from "./middlewares/enforceChannelMemberShip";
import checkMemberShip from "./commands/actions/checkMemberShip";
import mainMenu from "./commands/actions/mainMenu";
import contact from "./commands/actions/contact";
import myChatMember from "./commands/on/myChatMember";
import constants from "./utils/constants";
import info from "./commands/actions/info";
import isBot from "./middlewares/isBot";
import websites from "./commands/actions/websites";
import navigationHome from "./commands/actions/navigationHome";
import reports from "./commands/actions/reports";
import reportInput from "./commands/actions/reportInput";
import reportResult from "./commands/actions/reportResult";
const bot = new Telegraf(telegram.token);

bot.on("my_chat_member", myChatMember)

// middleWares
bot.use(isBot)
bot.action("checkMembership", checkMemberShip)
bot.use(enforceChannelMembership)



// command
bot.start(mainMenu);

// hears


//actions
bot.on("contact", contact)
bot.action(`callback_${constants.navigation.HOME.shortname}`, navigationHome)
bot.action(`callback_${constants.navigation.PROFILE.shortname}`, info)
bot.action(`callback_${constants.navigation.WEBSITES.shortname}`, websites)
bot.action(`callback_${constants.navigation.REPORTS.shortname}`, reports)
for (const report of Object.values(constants.reports)) {
    bot.action(`callback_${report.shortname}`, (ctx) => reportInput(report.fullname, `report_${report.shortname}`, ctx))
}
for (const report of Object.values(constants.reports)) {
    for (const time of Object.values(constants.time)) {
        console.log(`callback_report_${report.shortname}_${time.shortname}`)
        bot.action(`callback_report_${report.shortname}_${time.shortname}`, (ctx) => reportResult(report, time, ctx))
    }
}

// Launch the bot
bot.launch();

export default bot
