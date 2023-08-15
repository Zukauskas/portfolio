import About from "./components/About";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
    </>
  );
}
