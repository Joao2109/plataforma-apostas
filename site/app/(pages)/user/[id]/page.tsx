import Image from "next/image";
import { prisma } from "@/lib/prisma";
interface UserPageProps {
  params: {
    id: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  console.log(user);
  return <main className="w-full min-h-[calc(100dvh-160px)]"></main>;
};
export default UserPage;
