"use client";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function Nav(): JSX.Element {
  return (
    <Navbar>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#about-me">
            About Me
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#projects">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
