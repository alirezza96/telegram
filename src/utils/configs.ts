import "dotenv/config"
export const telegram : {token: string} = {
    token: process.env.TELEGRAM_TOKEN || ""
}

