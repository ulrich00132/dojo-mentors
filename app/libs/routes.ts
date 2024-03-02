export const routes = {
    signIn: "/login",
    signUp: "/signup",
    account: "/account",
    booking: "/booking",
    mentors: "/mentors",
    checkout: "/checkout",
    referral: "/referral",
    subscription: "/subscription",
    mentoring: "/mentoring",
    mentees: "/mentees",
    resetPassword: "/reset-password",
    reservations: "/reservations",
    terms: "/terms",
    privacy: "/privacy",
};

export const singleLevelNestedRoutes = {
    account: {
        profile: routes.account + "/profile",
        mentorship: routes.account + "/mentorship",
        payments: routes.account + "/payments",
        wallet: routes.account + "/wallet",

    },
    checkout: {
        success: routes.checkout + "/thank-you",
        failure: routes.checkout + "/failure"
    }
}