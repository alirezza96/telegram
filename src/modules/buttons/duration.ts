export const duration = () => {
    return {
        reply_markup: {
            keyboard: [
                [
                    { text: "امروز" },
                    { text: "دیروز" },
                ],
                [
                    { text: "سه روز گذشته" },
                    { text: "هفته گذشته" },
                ],
                [
                    { text: "ماه گذشته" },
                ],
                [
                    { text: "خانه" },
                    { text: "بازگشت" }
                ],
            ]
        }
    }
}