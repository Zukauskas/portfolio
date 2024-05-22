/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/vimjGEJLo1b
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function LandingPage() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className="sticky top-0 flex items-center px-4 h-14 lg:px-6 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <Link className="flex justify-center items-center" href="/">
          <CodeIcon className="w-6 h-6" />
          <span className="sr-only">Zukauskas.dev Portfolio</span>
        </Link>
        <nav className="flex gap-4 ml-auto sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#skills">
            Skills
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contacts">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/bg-image.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6 gap-2">
            <div className="flex flex-col items-center p-6 space-y-4 text-center rounded-xl bg-black/50 bg-clip-padding backdrop-blur-sm shadow-xl md:p-10">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-blue-500 sm:text-5xl md:text-6xl lg:text-7xl">Tautvydas Žukauskas</h1>
                <h2 className="text-2xl font-semibold text-gray-500 md:text-3xl">Web Developer</h2>
              </div>
              <div className="flex space-x-4">
                <a href="mailto:tautvydaszuk@gmail.com" className="h-7 w-7">
                  <svg fill="#8B0000" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>

                </a>
                <a href="https://github.com/Zukauskas" className="h-7 w-7">
                  <svg fill="#FFFFFF" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/tautzuk" className="h-7 w-7">
                  <svg fill="#0A66C2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>

                </a>
              </div>

            </div>
            <div className="mouse-icon"></div>
          </div>
        </section>
        <section className="py-12 w-full h-screen bg-gray-100 md:py-24 lg:py-32 flex flex-col items-center justify-center" id="skills">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg">My Skills</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Expertise and Capabilities
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have a diverse set of skills that allow me to create high-quality web applications. From front-end
                  development to back-end integration, I&apos;m proficient in the latest technologies and frameworks.
                </p>
              </div>
            </div>
            <div className="grid gap-6 items-center py-12 mx-auto max-w-5xl lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Front-end Development</h3>
                <p className="text-gray-500 d">
                  Expertise in HTML5, CSS3, JavaScript/TypeScript, and modern front-end frameworks like React/Next.js and Tailwind CSS. Creating visually appealing and user-friendly interfaces that captivate clients and deliver exceptional user experiences.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Back-end Development</h3>
                <p className="text-gray-500">
                  Proficient in server-side technologies such as Node.js, Python, with experience in building
                  RESTful APIs and integrating databases.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">UI/UX Design</h3>
                <p className="text-gray-500">
                  Skilled in creating visually appealing and user-friendly interfaces, with a keen eye for design and a
                  focus on accessibility.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 w-full h-screen md:py-24 lg:py-32 flex flex-col items-center justify-center" id="projects">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Showcasing My Work</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  Take a look at some of the web applications and projects I&apos;ve worked on. These showcase my skills and
                  the diverse range of technologies I&apos;ve mastered.
                </p>
              </div>
            </div>
            <div className="grid gap-6 items-center py-12 mx-auto max-w-5xl lg:grid-cols-2 lg:gap-12">
              <div className="overflow-hidden relative rounded-xl group">
                <img
                  alt="Project 1"
                  className="object-cover object-center overflow-hidden mx-auto transition-all duration-300 aspect-video group-hover:scale-105"
                  height="310"
                  src="/placeholder.svg"
                  width="550"
                />
                <div className="absolute inset-0 p-6 opacity-0 transition-all duration-300 bg-gray-900/80 group-hover:opacity-100">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-50">Project 1</h3>
                      <p className="mt-2 text-gray-300">
                        A modern and responsive web application built with React and Firebase.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        className="inline-flex justify-center items-center px-4 h-9 text-sm font-medium text-gray-900 bg-gray-50 rounded-md shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        View Project
                      </Link>
                      <Link
                        className="inline-flex justify-center items-center px-4 h-9 text-sm font-medium bg-white rounded-md border border-gray-200 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden relative rounded-xl group">
                <img
                  alt="Project 2"
                  className="object-cover object-center overflow-hidden mx-auto transition-all duration-300 aspect-video group-hover:scale-105"
                  height="310"
                  src="/placeholder.svg"
                  width="550"
                />
                <div className="absolute inset-0 p-6 opacity-0 transition-all duration-300 bg-gray-900/80 group-hover:opacity-100">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-50">Project 2</h3>
                      <p className="mt-2 text-gray-300">
                        A e-commerce website built with Next.js and Stripe integration.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        className="inline-flex justify-center items-center px-4 h-9 text-sm font-medium text-gray-900 bg-gray-50 rounded-md shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        View Project
                      </Link>
                      <Link
                        className="inline-flex justify-center items-center px-4 h-9 text-sm font-medium bg-white rounded-md border border-gray-200 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 w-full  h-screen bg-gray-100 md:py-24 lg:py-32 flex flex-col items-center justify-center" id="contacts">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg">
                  Get in Touch
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let&apos;s Collaborate</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  I&apos;m always excited to work on new projects and connect with fellow developers. Feel free to reach out
                  to me using the form below, and I&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <div className="mx-auto space-y-2 w-full max-w-sm">
                <form className="flex flex-col space-y-4">
                  <Input className="flex-1 max-w-lg" placeholder="Your Name" type="text" />
                  <Input className="flex-1 max-w-lg" placeholder="Your Email" type="email" />
                  <Textarea className="flex-1 max-w-lg" placeholder="Your Message" />
                  <Button className="w-full" type="submit">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col justify-center gap-2 items-center px-4 py-6 w-full border-t sm:flex-row shrink-0 md:px-6">
        <p className="text-xs text-gray-500">© 2024 Tautvydas Žukauskas. All rights reserved.</p>
      </footer>
    </div>
  )
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}