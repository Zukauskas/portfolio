
interface Repository {
  id: number
  name: string
  description: string
  html_url: string
}

interface RepoCardProps {
  repo: Repository
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-4'>
      <h3 className='text-xl font-bold mb-2'>{repo.name}</h3>
      <p className='text-gray-700 mb-4'>{repo.description}</p>
      <a
        href={repo.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
      >
        Visit Repo
      </a>
    </div>
  )
}

export default RepoCard
