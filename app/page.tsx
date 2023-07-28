import Image from "next/image";

export default function Home(): JSX.Element {
    return (
        <>
            <main>
                <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4 pb-20">
                    <Image
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                        src="/bg-image.jpg"
                        alt="image with programming code"
                        width="1920"
                        height="1080"
                    />
                    <div className="z-10 bg-black/50 pt-12 pb-12 pl-6 pr-6">
                        <h1 className="text-5xl md:text-5xl animate-typingTitle overflow-hidden whitespace-nowrap text-white font-bold">
                            Hi, my name is Tautvydas Žukauskas
                        </h1>
                    </div>
                </div>
            </main>
        </>
    );
}
