import Link from "next/link";

interface Repository {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
}

interface RepoCardProps {
  repo: Repository;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-gray-200 p-4">
      <Link
        href={repo.html_url}
        className="mb-2 text-lg font-semibold hover:underline"
      >
        {repo.full_name}
      </Link>
      <p className="mb-4 text-gray-700">{repo.description}</p>
      <div className="flex items-center">
        <span className="mr-2 h-3 w-3 rounded-full bg-black" />
        <span>{repo.language}</span>
      </div>
    </div>
  );
};

export default RepoCard;
