import { Telegraf } from "telegraf";
import { telegram } from "./utils/configs";
import welcome from "./commands/on/welcome";
// import mainMenu from "./commands/actions/mainMenu";
// import enforceChannelMembership from "./middlewares/enforceChannelMemberShip";
// import checkMemberShip from "./commands/actions/checkMemberShip";
import contact from "./commands/actions/contact";
import mainMenu from "./commands/actions/mainMenu";
// import constants from "./utils/constants";
// import info from "./commands/actions/info";
// import websites from "./commands/actions/websites";
// import navigationHome from "./commands/actions/navigationHome";
// import reports from "./commands/actions/reports";
// import reportInput from "./commands/actions/reportInput";
// import reportResult from "./commands/actions/reportResult";
// import isUserExists from "./middlewares/isUserExists";
const bot = new Telegraf(telegram.token);


// bot.use(isUserExists) // 1
bot.on("my_chat_member", welcome)
bot.start(mainMenu)

// middleWares
// bot.action("checkMembership", checkMemberShip)
// bot.use(enforceChannelMembership)



// command
// bot.start(mainMenu);

// // hears

// bot.on("text", async (ctx) => {
//     const response = await fetch(`http://127.0.0.1:4001/user?id=${ctx.from!.id}`)
//     const result = await response.json()
//     console.log("response =>", response.status)
//     console.log("result =>", result)
//     const input = ctx.message.text;
//     if (response.status === 400) {
//         if (!/^\d{5}$/.test(input)) {
//             return ctx.reply("کد باید 5 رقمی و فقط شامل اعداد باشد.");
//             // return  ctx.replyWithMarkdownV2(`Counter updated, new value: \`${1}\``)
//         }

//         await ctx.replyWithMarkdownV2(`کد شما \`${input}\` با موفقیت ثبت شد`);
//         return
//     }
// });
// //actions
bot.on("contact", contact)
// bot.action(`callback_${constants.navigation.HOME.shortname}`, navigationHome)
// bot.action(`callback_${constants.navigation.PROFILE.shortname}`, info)
// bot.action(`callback_${constants.navigation.WEBSITES.shortname}`, websites)
// bot.action(`callback_${constants.navigation.REPORTS.shortname}`, reports)
// for (const report of Object.values(constants.reports)) {
//     bot.action(`callback_${report.shortname}`, (ctx) => reportInput(report.fullname, `report_${report.shortname}`, ctx))
// }
// for (const report of Object.values(constants.reports)) {
//     for (const time of Object.values(constants.time)) {
//         bot.action(`callback_report_${report.shortname}_${time.shortname}`, (ctx) => reportResult(report, time, ctx))
//     }
// }

// Launch the bot
bot.launch();

//  Graceful shutdown
const GracefulShutdown = (signal: string) => {
    console.log(`${signal} received: shutdown gracefully`)
    try {
        bot.stop()
        process.exit(0)
    } catch (err) {
        console.error("error during shutdown")
        process.exit(1)
    }
}

process.on("SIGINT", () => GracefulShutdown("SIGINT"))
process.on("SIGTERM", () => GracefulShutdown("SIGTERM"))




export default bot
