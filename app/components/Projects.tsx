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
      <div className="bg-[#f8f8f2]">
        <h2
          id="projects"
          className="text-xl font-bold text-[#44475a] md:text-2xl"
        >
          Projects
        </h2>

        <div className="m-auto flex w-11/12 flex-col gap-10 md:w-9/12">
          <p className="z-10 mt-10 text-left text-xl font-bold text-[#44475a] md:text-center">
            Welcome! As a budding professional in the realm of software
            development and IT, I am passionately dedicated to expanding my
            knowledge and honing my skills. This carefully curated collection of
            projects showcases my commitment to continuous learning and growth.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
