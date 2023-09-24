export default function Home(): JSX.Element {
  return (
    <>
      <main>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 pb-20">
          <div className="z-10 flex bg-black/50 px-2 py-6">
            <h1 className="text-2xl font-bold text-white sm:animate-typingTitle sm:overflow-hidden sm:whitespace-nowrap sm:px-6 sm:py-12 sm:text-3xl md:text-5xl">
              Hi, my name is Tautvydas Žukauskas
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
