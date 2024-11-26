import { Context, MiddlewareFn } from "telegraf";

// Middleware to check if the user is a bot
const isBot: MiddlewareFn<Context> = async (ctx, next) => {
  if (ctx.from?.is_bot) {
    // If the sender is a bot, you can decide how to handle it
    console.log("Blocked a bot message.");
    return; // Stop further middleware execution
  }

  // If not a bot, continue to the next middleware
  await next();
};

export default isBot;
