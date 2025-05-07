import GamePages from "@/components/game-pages";
import GamePreview from "@/components/game-preview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Wrapper from "@/components/wrapper";
import { GamePreview as Game } from "@/types/game-preview";
export default function Home() {
  const games: Game[] = [];
  for (let i = 0; i < 100; i++) {
    games.push({
      id: (i + 1).toString(),
      title: `Game ${i + 1}`,
      gameUrl: `Game ${i + 1}`,
      bannerUrl: "/logo.png",
      description: "Description",
      accesses: Math.floor(Math.random() * 10000),
      createdAt: new Date(),
    });
  }
  return (
    <main className="w-full min-h-[calc(100dvh-160px)]">
      <Wrapper>
        <section className="my-8 bg-accent rounded-4xl px-2 py-6">
          <h2 className="text-4xl text-center font-semibold mb-4">
            Mais Jogados
          </h2>
          <Carousel
            className="w-[calc(100%-20px)] mx-auto"
            opts={{ loop: true, dragFree: true }}
          >
            <CarouselContent>
              {games
                .sort((a, b) => b.accesses - a.accesses)
                .slice(0, 10)
                .map((_, i) => {
                  return (
                    <CarouselItem key={i} className="basis-40 h-40 ml-8 p-0">
                      <GamePreview className="w-40 h-40" game={games[i]} />
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
          </Carousel>
        </section>
        <section className="flex flex-col md:flex-row gap-6 mb-8">
          <section className="flex-1 flex flex-col items-center rounded-4xl p-4 gap-2 bg-accent">
            <h2 className="text-3xl text-center font-semibold mb-4">
              Lançamentos
            </h2>
            {games
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, 5)
              .map((_, i) => {
                return (
                  <GamePreview className="w-30 h-30" game={games[i]} key={i} />
                );
              })}
          </section>
          <GamePages
            className="flex-2 rounded-4xl p-4 gap-2 bg-accent"
            games={games}
          />
        </section>
      </Wrapper>
    </main>
  );
}
