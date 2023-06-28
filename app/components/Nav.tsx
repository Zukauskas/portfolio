'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav (): JSX.Element {
  const pathName = usePathname()

  return (
    <nav className='bg-white border-gray-200 z-10'>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 inline-flex mx-auto justify-between bg-[#6272a4] w-11/12 md:w-6/12 xl:w-3/12 rounded-3xl z-10'>
        <Link
          aria-current='page'
          className={`inline-flex flex-col items-center text-xs font-medium py-3 px-4 flex-grow ${pathName === '/' ? 'text-white' : 'text-blue-400'} hover:text-white`}
          href='/'
        >
          <svg
            className='w-7 h-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
          <span className='sr-only'>Home</span>
        </Link>
        <Link
          className={`inline-flex flex-col items-center text-xs font-medium ${pathName === '/about' ? 'text-white' : 'text-blue-400'} hover:text-white py-3 px-4 flex-grow`}
          href='/about'
        >
          <svg
            className='w-7 h-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>About me</span>
        </Link>
        <Link
          className='inline-flex flex-col items-center text-xs font-medium text-blue-400 hover:text-white py-3 px-4 flex-grow'
          href='#'
        >
          <svg
            className='w-7 h-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Projects</span>
        </Link>
        <Link
          className='inline-flex flex-col items-center text-xs font-medium text-blue-400 hover:text-white py-3 px-4 flex-grow'
          href='#'
        >
          <svg
            className='w-7 h-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Blog</span>
        </Link>
      </div>
    </nav>
  )
}
