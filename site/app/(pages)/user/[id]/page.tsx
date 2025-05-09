import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Wrapper from "@/components/wrapper";
import { PencilLine } from "lucide-react";
import UserName from "@/components/user-name";
import { Button } from "@/components/ui/button";
interface UserPageProps {
  params: {
    id: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return (
      <main className="w-full min-h-[calc(100dvh-160px)] flex items-center justify-center">
        <h1 className="text-6xl font-semibold">User not found</h1>
      </main>
    );
  } else {
    return (
      <main className="w-full min-h-[calc(100dvh-160px)] overflow-x-hidden">
        <Wrapper>
          <section className="w-full flex flex-col md:flex-row items-center gap-2">
            <section className="w-full max-w-72 aspect-square mx-auto rounded-full relative overflow-hidden group">
              <Image
                src={user.image ?? "/user.png"}
                alt={user.name ?? "User"}
                className="object-contain"
                fill
              />
              <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 cursor-pointer">
                <PencilLine />
              </section>
            </section>
            <section className="w-full md:w-auto flex-1">
              <UserName user={{ id: user.id, name: user.name ?? "" }} />
            </section>
          </section>
          <section className="w-full">
            <h2 className="text-sm font-semibold text-center">
              R$:{user.balance.toFixed(2)}
            </h2>
            <section className="flex justify-center mt-2 p-2 gap-2">
              <Button className="w-1/2 max-w-32" variant={"ghost"}>
                Depositar
              </Button>
              <Button className="w-1/2 max-w-32" variant={"ghost"}>
                Sacar
              </Button>
            </section>
          </section>
        </Wrapper>
      </main>
    );
  }
};
export default UserPage;
