export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/account",
        "/booking",
        "/checkout",
        "/mentees",
        "/mentoring",
        "/referral",
        "/reservations",
    ]
}