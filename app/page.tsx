"use client";
import About from "./components/About";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import { NextUIProvider } from "@nextui-org/react";

export default function Home(): JSX.Element {
  return (
    <NextUIProvider>
      <Nav />
      <Hero />
      <About />
      <Projects />
    </NextUIProvider>
  );
}
