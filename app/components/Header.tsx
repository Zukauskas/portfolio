import {NavbarItem, Navbar, Link, NavbarBrand, NavbarContent, Button} from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">ZUKAUSKAS.DEV</p>
        </NavbarBrand>
        <NavbarContent className="hidden flex gap-4 ">
          <NavbarItem>
            <Link color="foreground" href="#">
              About Me
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Experience
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Projects
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
}