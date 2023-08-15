"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav(): JSX.Element {
  const pathName = usePathname();

  return (
    <nav className="z-10 border-gray-200 bg-white">
      <div className="h-11/12 xl:h-3/12 md:h-6/12 fixed top-1/2 z-10 mx-auto flex -translate-y-1/2 transform flex-col rounded-3xl bg-[#6272a4]">
        <Link
          aria-current="page"
          className={`inline-flex flex-grow flex-col items-center px-4 py-3 text-xs font-medium ${
            pathName === "/" ? "text-white" : "text-blue-400"
          } hover:text-white`}
          href="/"
        >
          <svg
            className="h-7 w-7"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="sr-only">Home</span>
        </Link>
        <Link
          className={`inline-flex flex-col items-center text-xs font-medium ${
            pathName === "/about" ? "text-white" : "text-blue-400"
          } flex-grow px-4 py-3 hover:text-white`}
          href="/about"
        >
          <svg
            className="h-7 w-7"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">About me</span>
        </Link>
        <a
          className={`inline-flex flex-col items-center text-xs font-medium ${
            pathName === "/projects" ? "text-white" : "text-blue-400"
          } flex-grow px-4 py-3 pt-4 hover:text-white`}
          href="#projects"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            {" "}
            <path
              d="M3.994 1c-1.258.015-2.179-.029-2.931.387a1.878 1.878 0 0 0-.84.996C.058 2.82 0 3.343 0 4v8c0 .658.058 1.179.223 1.617.164.439.463.79.84.998.752.416 1.673.37 2.931.385h8.012c1.258-.015 2.179.03 2.932-.385.376-.207.675-.56.84-.998.164-.438.222-.96.222-1.617V6c0-.658-.058-1.179-.223-1.617-.02-.055-.048-.104-.074-.154l-.027-.057a1.838 1.838 0 0 0-.738-.787c-.753-.416-1.674-.37-2.932-.385H8.967L6.945 1H3.996zm.012 1h2.53L8.3 3.746 7.033 5H3.994c-1.258.015-2.179-.03-2.932.385-.022.012-.04.03-.062.043V4c0-.592.062-1.006.16-1.266s.203-.371.387-.472c.366-.203 1.195-.247 2.459-.262zm5.459 2h2.527c1.264.015 2.092.06 2.46.262.183.1.288.212.386.472.098.26.162.674.162 1.266v6c0 .592-.063 1.006-.16 1.266-.098.26-.203.371-.387.472-.366.202-1.193.247-2.453.262H4c-1.26-.015-2.087-.06-2.453-.262-.184-.1-.29-.212-.387-.472C1.063 13.006 1 12.592 1 12V8c0-.592.064-1.006.162-1.266s.203-.371.387-.472c.367-.203 1.195-.247 2.459-.262h3.435z"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">Projects</span>
        </a>
        <Link
          className={`inline-flex flex-col items-center text-xs font-medium ${
            pathName === "/blog" ? "text-white" : "text-blue-400"
          } flex-grow px-4 py-3 hover:text-white`}
          href="/blog"
        >
          <svg
            className="h-7 w-7"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844 c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219 c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906 c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344 v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594 c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z" />
            <path d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313 c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656 c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656 c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z" />
          </svg>
          <span className="sr-only">Blog</span>
        </Link>
      </div>
    </nav>
  );
}
