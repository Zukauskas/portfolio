import Link from 'next/link'

interface Repository {
  id: number
  full_name: string
  description: string
  html_url: string
  language: string
}

interface RepoCardProps {
  repo: Repository
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className='bg-gray-200 border border-gray-300 rounded-lg p-4 flex flex-col'>
      <Link href={repo.html_url} className='text-lg font-semibold hover:underline mb-2'>{repo.full_name}
      </Link>
      <p className='text-gray-700 mb-4'>{repo.description}</p>
      <div className='flex items-center'>
        <span className='w-3 h-3 rounded-full bg-black mr-2' />
        <span>{repo.language}</span>
      </div>
    </div>

  )
}

export default RepoCard
