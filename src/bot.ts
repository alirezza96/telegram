import { Context, Telegraf, MiddlewareFn } from "telegraf";
import { telegram } from "./utils/configs";
import { IUser } from "./types/user";
import { duration } from "./modules/buttons/duration";
const bot = new Telegraf(telegram.token);


// Middleware: Handle contact messages
bot.on("contact", async (ctx) => {
    const chatId = ctx.from?.id;
    if (!chatId || !ctx.message || !("contact" in ctx.message) || !ctx.message.contact) {
        return ctx.reply("No valid contact information found.");
    }
    const phoneNumber = ctx.message.contact.phone_number;
    try {
        const response = await fetch(`http://127.0.0.1:4001/register?chatId=${chatId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNumber }),
        })
        const result = await response.json()
        ctx.reply(result.message);

    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
});

// must join channel

const requiredChannels = ["@channelalireza96"]; // لیست کانال‌های موردنظر

const enforceChannelMembership: MiddlewareFn<Context> = async (ctx, next) => {
    try {
        const chatId = ctx.from?.id;

        if (!chatId) {
            await ctx.reply("مشکلی در شناسایی حساب کاربری شما به وجود آمده است.");
            return;
        }

        // بررسی عضویت در همه کانال‌ها
        for (const channel of requiredChannels) {
            try {
                const member = await ctx.telegram.getChatMember(channel, chatId);

                // اگر وضعیت کاربر در کانال `left` یا `kicked` باشد
                if (member.status === "left" || member.status === "kicked") {
                    await ctx.reply(
                        `برای استفاده از ربات، لطفاً ابتدا در کانال زیر عضو شوید:`,
                        {
                            reply_markup: { inline_keyboard: [[{ text: "عضویت در کانال", url: channel.replace("@", 'https://t.me/') }]] }

                        }
                    );
                    return; // خروج از middleware
                }
            } catch (error) {
                console.error(`خطا در بررسی کانال ${channel}:`, error);
                await ctx.reply("مشکلی در بررسی عضویت شما در کانال رخ داده است.");
                return;
            }
        }
    

        // اگر کاربر در همه کانال‌ها عضو باشد، ادامه زنجیره middleware
        await next();
    } catch (error) {
        console.error("خطا در middleware عضویت:", error);
        await ctx.reply("مشکلی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
};




bot.use(enforceChannelMembership)
// Start command
bot.start(async (ctx) => {
    try {
        const chatId = ctx.from?.id;
        if (!chatId) {
            return ctx.reply("Chat ID not found.");
        }
        const response = await fetch(`http://127.0.0.1:4001/start?chatId=${chatId}`)
        if (response.status === 404) {
            ctx.reply("جهت استفاده از برنامه شماره همراه خود را ارسال کنید", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "📞 ارسال شماره تلفن",
                                request_contact: true, // Request user's phone number
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true, // Close keyboard after user response

                },

            }
            );
            return
        }
        const result = await response.json();
        ctx.reply(result.message, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: "داشبورد"
                        },
                        {
                            text: "گزارش"
                        },
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true, // Close keyboard after user response

            },

        });
        // show keyboard buttons without reply



    } catch (error) {
        console.error("Error processing contact:", error);
        ctx.reply("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
});



bot.hears("داشبورد", async (ctx) => {
    const chatId = ctx.from.id
    const response = await fetch(`http://127.0.0.1:4001/user?chatId=${chatId}`)
    const result = await response.json()
    const { code, loginname, sharh }: IUser = result
    ctx.reply(`نام : ${sharh} \n کد کاربری: ${code} \n نام کاربری: ${loginname} \n chatId: ${chatId}`)
})


bot.hears("گزارش", ctx => {

    ctx.reply("لطفا بازه زمانی گزارش را انتخاب کنید", duration())
})
// Launch the bot
bot.launch();
