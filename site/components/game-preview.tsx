import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { GamePreview as Game } from "@/types/game-preview";
interface GamePreviewProps {
  className?: string;
  acessos?: boolean;
  game: Game;
}
const GamePreview = ({
  className,
  acessos,
  game: { id, title, bannerUrl, description, accesses },
}: GamePreviewProps) => {
  return (
    <Link
      href={`/game/${id}`}
      id={id}
      className={cn(
        "w-40 h-40 block bg-transparent border-2 border-amber-500 relative rounded-2xl overflow-hidden cursor-pointer group",
        className
      )}
    >
      {acessos && (
        <p className="absolute top-2 right-2 text-xs">{accesses} acessos</p>
      )}
      <Image className="-z-[1]" src={bannerUrl} alt={title} fill />
      <div className="w-full h-1/2 bg-black/50 absolute bottom-[-100%] left-0 transition-all duration-1000 ease-in-out group-hover:bottom-0">
        <h3 className="font-semibold text-center">{title}</h3>
        <p className="px-2 truncate">{description}</p>
      </div>
    </Link>
  );
};

export default GamePreview;
