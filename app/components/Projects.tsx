"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
}

export default function Projects(): JSX.Element {
  const [repos, setRepos] = useState<Repository[]>([]);
  const repoList: string[] = [
    "portfolio",
    "only-fund",
    "bankas",
    "my-weather-app",
    "todo-app",
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.github.com/users/zukauskas/repos",
        );
        const data: Repository[] = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error retrieving repositories:", error);
      }
    };

    void fetchData();
  }, []);

  const filteredRepos = repos
    .filter((repo) => repoList.includes(repo.name))
    .sort((a, b) => a.id - b.id);

  return (
    <>
      <main>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 pb-20">
          <Image
            className="absolute left-0 top-0 h-full w-full bg-cover bg-center"
            src="/bg-image.jpg"
            alt="image with programming code"
            width="1920"
            height="1080"
          />
          <div className="z-9 absolute bottom-0 top-0 w-full overflow-scroll rounded-xl bg-[#f8f8f2] pb-20 sm:bottom-2 sm:top-2 sm:w-10/12 md:w-9/12 lg:w-10/12">
            <div className=" z-25 flex items-center justify-center rounded-t-lg border-b-2 border-[#44475a] bg-[#ff79c6] text-center">
              <p className="z-10 text-xl font-bold text-[#44475a] md:text-2xl">
                Projects
              </p>
              <Link className=" absolute right-3" href="/">
                <svg
                  className="text-[#282a36]"
                  height="24px"
                  viewBox="0 0 512 512"
                  width="24px"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
              </Link>
            </div>
            <div className="m-auto flex w-11/12 flex-col gap-10 md:w-9/12">
              <p className="z-10 mt-10 text-left text-xl font-bold text-[#44475a] md:text-center">
                Welcome! As a budding professional in the realm of software
                development and IT, I am passionately dedicated to expanding my
                knowledge and honing my skills. This carefully curated
                collection of projects showcases my commitment to continuous
                learning and growth.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
