import Image from "next/image";

export default function Blog(): JSX.Element {
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
                    <div className="z-10 bg-black/50 py-6 px-2">
                        <h1 className="text-md md:text-5xl md:py-12 md:px-6 animate-typingTitle overflow-hidden whitespace-nowrap text-white font-bold">
                            Blog will be coming soon!!!
                        </h1>
                    </div>
                </div>
            </main>
        </>
    );
}
