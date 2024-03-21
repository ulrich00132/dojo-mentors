export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/account",
        "/account/:path*",
        "/booking",
        "/checkout",
        "/mentees",
        "/mentoring",
        "/referral",
        "/reservations",
    ]
}