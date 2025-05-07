"use client";
import { useState } from "react";
import GamePreview from "./game-preview";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination";
import { GamePreview as Game } from "@/types/game-preview";
interface GamePreviewProps {
  className?: string;
  games: Game[];
}
const GamePages = ({ className, games }: GamePreviewProps) => {
  const pages = Array.from({ length: Math.ceil(games.length / 10) });
  const [page, setPage] = useState(1);
  return (
    <section className={className}>
      <h2 className="text-3xl text-center font-semibold mb-4">
        Todos os jogos
      </h2>
      <div className="w-[248px] m-auto grid grid-cols-2 grid-rows-5 gap-2 justify-center">
        {games
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice((page - 1) * 10, page * 10)
          .map((_, i) => (
            <GamePreview
              className="w-30 h-30"
              game={games[i + (page - 1) * 10]}
              key={i}
            />
          ))}
      </div>
      {games.length > 0 && (
        <Pagination className="mt-2">
          <PaginationContent>
            {pages.length > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                />
              </PaginationItem>
            )}
            <PaginationItem
              className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                page === 1 ? "font-semibold bg-border" : ""
              }`}
              onClick={() => setPage(1)}
            >
              1
            </PaginationItem>
            {page > 2 && <PaginationEllipsis />}
            {pages.map(
              (_, i) =>
                i > 0 &&
                i >= page - 2 &&
                i <= page &&
                i < pages.length - 1 && (
                  <PaginationItem
                    className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                      page === i + 1 ? "font-semibold bg-border" : ""
                    }`}
                    key={i}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationItem>
                )
            )}
            {page < pages.length - 2 && <PaginationEllipsis />}
            <PaginationItem
              className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                page === pages.length ? "font-semibold bg-border" : ""
              }`}
              onClick={() => setPage(pages.length)}
            >
              {pages.length}
            </PaginationItem>
            {pages.length > 1 && (
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    setPage(page < pages.length ? page + 1 : pages.length)
                  }
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default GamePages;
