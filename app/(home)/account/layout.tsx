import getCurrentUser from "@/app/actions/getCurrentUser";
import Nav from "@/app/components/dashboard/Nav/Nav";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    
    return (
        <div className="pb-20 pt-28">
            {children}
        </div>
    )
    
}