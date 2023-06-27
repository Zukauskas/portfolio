import Image from 'next/image'
import Link from 'next/link'

export default function About (): JSX.Element {
  return (
    <>
      <main>
        <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4 pb-20'>
          <Image className='absolute top-0 left-0 w-full h-full bg-cover bg-center' src='/bg-image.jpg' alt='image with programming code' width='1920' height='1080' />
          <div className='z-9 bg-white absolute top-5 bottom-2 w-10/12 rounded-lg'>
            <div className=' border-b-2 border-black text-center flex items-center justify-center'>
              <h1 className='text-xl md:text-2xl text-black font-bold z-10'>About Me</h1>
              <Link className=' absolute right-3' href='/'>X</Link>
            </div>
            <p className=' z-10 text-2xl text-black'>This is an about me page</p>

          </div>
        </div>
      </main>
    </>
  )
}
