const constants = {
    YES: "بله",
    NO: "خیر",
    navigation: {
        WEBSITES: { shortname: "websites", fullname: "وب سایت ها" },
        HOME: { fullname: "🏠 خانه", shortname: "home" },
        BACK: { fullname: "🔙 بازگشت", shortname: "back" },
        PROFILE: { fullname: "پروفایل", shortname: "profile" },
        REPORTS: { fullname: "گزارشات", shortname: "reports" }
    },
    time: {
        TODAY: {fullname: "امروز", shortname: "today"},
        YESTERDAY: {fullname: "دیروز", shortname: "yesterday"},
        THREE_DAYS_AGO: {fullname: "سه روز گذشته", shortname: "3days"},
        ONE_WEEK_AGO: {fullname: "هفته گذشته", shortname: "1week"},
        ONE_MONTH_AGO: {fullname: "ماه گذشته", shortname: "1month"},
    },
    reports: {
        AMAR_TAMAS: { fullname: "آمار تماس", shortname: "amar_tamas" },
        POORSANT: {fullname: "پورسانت", shortname: "poorsant"}

    },

}

export const websites: { id: number, shortname: string, fullname: string, url: string }[] = [
    { id: 1, shortname: "pakhsh_sarasari", fullname: "پخش سراسری", url: "pspegah.ir" },
    { id: 2, shortname: "bi", fullname: "هوش تجاری", url: "bi.pspegah.ir" },
]


export default constants