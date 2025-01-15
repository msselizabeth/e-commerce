import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import RegisterForm from "@/components/Forms/RegisterForm";


export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/user");
  }
  return (
    <section className="container mx-auto px-3 pt-10 pb-14 lg:px-4 lg:pt-12 lg:pb-16">
       <RegisterForm />
    </section>
  );
}