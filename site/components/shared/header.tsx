import Image from "next/image";
import { auth } from "@/lib/auth";
import { Button } from "../ui/button";
import Link from "next/link";
const Header = async () => {
  // @ts-expect-error user-does-in-fact-exist
  const { user } = await auth();
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
                <Link href={`/user/${user.id}`}>
                  <Image
                    className="rounded-full"
                    src={user.image}
                    alt="User"
                    width={32}
                    height={32}
                  />
                  <p className="truncate text-xs">{user.name}</p>
                </Link>
              </Button>
            </div>
            <Link href="/">R$: {user.balance.toFixed(2)}</Link>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </header>
  );
};

export default Header;
