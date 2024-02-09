export const routes = {
    signIn: '/login',
    signUp: '/signup',
    account: '/account',
    mentors: '/mentors',
    checkout: 'checkout',
    referral: "/referral",
    subscription: "/subscription",
    mentoring: "/mentoring",
    mentees: "/mentees",
    resetPassword: "/reset-password"
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