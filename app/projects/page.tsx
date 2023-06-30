'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function About (): JSX.Element {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('https://api.github.com/users/zukauskas/repos')
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Error retrieving repositories:', error)
      }
    }

    fetchData()
  }, [])

  console.log(repos)

  return (
    <>
      <main>
        <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4 pb-20'>
          <Image className='absolute top-0 left-0 w-full h-full bg-cover bg-center' src='/bg-image.jpg' alt='image with programming code' width='1920' height='1080' />
          <div className='z-9 bg-[#f8f8f2] absolute top-0 bottom-0 w-full rounded-xl sm:top-2 sm:bottom-2 sm:w-10/12 md:w-9/12 lg:w-10/12 overflow-scroll'>
            <div className=' border-b-2 border-[#44475a] bg-[#bd93f9] text-center flex items-center justify-center rounded-t-lg z-25'>
              <p className='text-xl md:text-2xl text-[#44475a] font-bold z-10'>Projects</p>
              <Link className=' absolute right-3' href='/'>X</Link>
            </div>

          </div>
        </div>

      </main>
    </>
  )
}
