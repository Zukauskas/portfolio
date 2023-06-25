import Image from 'next/image';

export default function About () {
  return (
    <>
      <main>
        <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4 pb-20'>
          <Image className='absolute top-0 left-0 w-full h-full bg-cover bg-center' src='/bg-image.jpg' alt='image with programming code' width='1920' height='1080' />
          <h1 className='text-3xl md:text-5xl text-white font-bold mb-8 z-10'>Hi, my name is Tautvydas Žukauskas</h1>
          <p className=' z-10 text-2xl text-white'>This is an about me page</p>
        </div>
      </main>
    </>
  );
}
