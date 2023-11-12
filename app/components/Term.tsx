"use client";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import { useEffect } from "react";
import About from "./About";
import Projects from "./Projects";

export default function Term(): JSX.Element {
  const welcomeMessage = `Hello, welcome to my website!`;

  const commandHandler = (text: string) => {
    let response;
    let argsIndex = text.indexOf(" ");
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case "AboutMe":
        response = <About />;
        break;

      case "Projects":
        response = <Projects />;
        break;

      case "clear":
        response = null;
        break;

      case "help":
        response = "Available commands are AboutMe, Projects, clear and help";
        break;

      default:
        response = `Unknown command: ${command}`;
        break;
    }

    if (response) TerminalService.emit("response", response);
    else TerminalService.emit("clear");
  };

  useEffect(() => {
    TerminalService.on("command", commandHandler);

    return () => {
      TerminalService.off("command", commandHandler);
    };
  }, []);

  return (
    <Terminal
      className=" h-screen text-green-500"
      welcomeMessage={welcomeMessage}
      prompt="guest@Zukauskas.dev $"
      autoFocus
    />
  );
}
