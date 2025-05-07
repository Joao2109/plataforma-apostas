import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { GamePreview as Game } from "@/types/game-preview";
interface GamePreviewProps {
  className?: string;
  game: Game;
}
const GamePreview = ({
  className,
  game: { id, title, bannerUrl, description },
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
      <Image className="-z-[1]" src={bannerUrl} alt={title} fill />
      <div className="w-full h-1/2 bg-black/50 absolute bottom-[-100%] left-0 transition-all duration-1000 ease-in-out group-hover:bottom-0">
        <h3 className="font-semibold text-center">{title}</h3>
        <p className="px-2 truncate">{description}</p>
      </div>
    </Link>
  );
};

export default GamePreview;
