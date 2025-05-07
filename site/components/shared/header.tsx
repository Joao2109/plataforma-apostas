import Image from "next/image";
import { auth, signOut } from "@/lib/auth";
import { Button } from "../ui/button";
import Link from "next/link";
const Header = async () => {
  const session = await auth();
  const user = session?.user ?? null;
  return (
    <header className="w-full h-20 py-2 px-4 border-b-2 border-border">
      <nav className="flex items-center justify-between">
        <div className="relative w-16 h-16">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-32 h-12 relative overflow-hidden rounded-md">
              <Button asChild className="w-full h-full p-0" variant={"card"}>
                {/* @ts-expect-error user.id-exists */}
                <Link href={`/user/${user.id ? user.id : ""}`}>
                  <Image
                    className="rounded-full"
                    src={user.image ? user.image : "/user.png"}
                    alt="User"
                    width={32}
                    height={32}
                  />
                  <p className="truncate text-xs">{user.name}</p>
                </Link>
              </Button>
            </div>
            <p>R$: {user.balance ? user.balance.toFixed(2) : "0.00"}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                variant={"outline"}
                type="submit"
                className="cursor-pointer"
              >
                Sair
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild>
              <Link href={"/auth/sign-in"}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={"/auth/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
