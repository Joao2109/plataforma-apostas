"use client";
import { useState } from "react";
import GamePreview from "./game-preview";
import { GamePreview as Game } from "@/types/game-preview";
import PaginationButton from "./pagination-button";
interface GamePreviewProps {
  className?: string;
  games: Game[];
}
const GamePages = ({ className, games }: GamePreviewProps) => {
  const [loading, setLoading] = useState(false);
  const pages = Array.from({ length: Math.ceil(games.length / 10) });
  const [page, setPage] = useState(1);
  const updatePage = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      setPage(page);
      setLoading(false);
    }, 1000);
  };
  return (
    <section className={className}>
      <h2 className="text-3xl text-center font-semibold mb-4">
        Todos os jogos
      </h2>
      {loading ? (
        <div className="w-full h-[632px] flex items-center justify-center">
          <h2>Carregando...</h2>
        </div>
      ) : (
        <div className="w-[248px] h-[632px] m-auto grid grid-cols-2 grid-rows-5 gap-2 justify-center">
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
      )}
      {games.length > 0 && (
        <section className="w-full mt-2">
          <section className="flex items-center justify-center gap-2 mx-auto">
            {pages.length > 1 && (
              <PaginationButton
                asChild
                variant={"ghost"}
                disabled={loading}
                className="cursor-pointer disabled:cursor-not-allowed"
                onClick={() => page > 1 && updatePage(page - 1)}
              >
                <p>Previous</p>
              </PaginationButton>
            )}
            <PaginationButton
              className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                page === 1 ? "font-semibold bg-border" : ""
              }`}
              disabled={loading}
              onClick={() => page > 1 && updatePage(1)}
            >
              1
            </PaginationButton>
            {page > 2 && <p className="cursor-context-menu">...</p>}
            {pages.map(
              (_, i) =>
                i > 0 &&
                i >= page - 2 &&
                i <= page &&
                i < pages.length - 1 && (
                  <PaginationButton
                    className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                      page === i + 1 ? "font-semibold bg-border" : ""
                    }`}
                    key={i}
                    onClick={() => updatePage(i + 1)}
                    disabled={loading}
                  >
                    {i + 1}
                  </PaginationButton>
                )
            )}
            {page < pages.length - 2 && (
              <p className="cursor-context-menu">...</p>
            )}
            <PaginationButton
              className={`w-8 h-8 border-2 border-border text-center rounded-sm cursor-pointer hover:bg-border ${
                page === pages.length ? "font-semibold bg-border" : ""
              }`}
              disabled={loading}
              onClick={() => page < pages.length && updatePage(pages.length)}
            >
              {pages.length}
            </PaginationButton>
            {pages.length > 1 && (
              <PaginationButton
                asChild
                variant={"ghost"}
                disabled={loading}
                className="cursor-pointer disabled:cursor-not-allowed"
                onClick={() => page < pages.length && updatePage(page + 1)}
              >
                <p>Next</p>
              </PaginationButton>
            )}
          </section>
        </section>
      )}
    </section>
  );
};

export default GamePages;
