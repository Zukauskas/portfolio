import Image from "next/image";
import code from "../public/bg-image.jpg";

export default function Home(): JSX.Element {
    return (
        <>
            <main>
                <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4 pb-20">
                    <Image
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                        src={code}
                        alt="image with programming code"
                        fill
                        sizes="100vw"
                    />
                    <div className="z-10 bg-black/50 py-6 px-2 flex">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl sm:py-12 sm:px-6 sm:animate-typingTitle sm:overflow-hidden sm:whitespace-nowrap text-white font-bold">
                            Hi, my name is Tautvydas Žukauskas
                        </h1>
                    </div>
                </div>
            </main>
        </>
    );
}
