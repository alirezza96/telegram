import { User } from "telegraf/typings/core/types/typegram"
import { ChatMember } from "telegraf/typings/core/types/typegram"

type StatusType = Extract<ChatMember["status"], "creator" | "administrator" | "member" | "restricted" | "left" | "kicked">
export interface IBotUser {
    id: User["id"]
    username: User["username"] 
    first_name: User["first_name"]
    last_name: User["last_name"]
    status?: StatusType
}






export enum BotStatus {
    Member = "member",
    Kicked = "kicked"
}


export interface IBot {
    chatId: number,
    userId: number,
    status: BotStatus,
    branchNo: number
}