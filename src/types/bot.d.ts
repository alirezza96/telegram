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