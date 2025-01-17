import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/authOptions";
import LogoutButton from "@/components/Logout";

interface Session {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    postalCode?: string;
    tel?: string;
  };
}

export default async function User(){
    const session: Session | null = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
      }
    const user = session?.user || null;



    return (
        <section className="container mx-auto px-3 pt-10 pb-14 lg:px-4 lg:pt-12 lg:pb-16">
            <h1>USER Dashboard</h1>
            <p>Welcome to the your dashboard, {user?.firstName || ""} !</p>
            <h2>Delivery information:</h2>
            <p>Address: {user?.address || ""}</p>
            <p>Postal code: {user?.postalCode || ""}</p>
            <p>Phone: {user?.tel || ""}</p>
            <p>Email: {user?.email || ""}</p>

      <LogoutButton />
        </section>
    )
}