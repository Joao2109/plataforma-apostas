const GamePage = async ({ params }) => {
  const data = await params;
  console.log(data);
  return (
    <main className="w-full min-h-[calc(100dvh-160px)]">
      <section className="w-full h-screen flex items-center justify-center">
        <section className="h-full max-h-[600px] aspect-[9/16] mx-auto border-2 border-amber-500"></section>
      </section>
    </main>
  );
};

export default GamePage;
