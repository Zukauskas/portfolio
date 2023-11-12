"use client";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import { useEffect } from "react";

export default function Term(): JSX.Element {
  const welcomeMessage =
    "Welcome to Zukauskas.dev (Type 'help' for all commands)";

  const commandHandler = (text: string) => {
    let response;
    let argsIndex = text.indexOf(" ");
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case "date":
        response = "Today is " + new Date().toDateString();
        break;

      case "greet":
        response = "Hello " + text.substring(argsIndex + 1) + "!";
        break;

      case "random":
        response = Math.floor(Math.random() * 100);
        break;

      case "clear":
        response = null;
        break;
      case "help":
        response = " Available commands are date, greet, random and clear";
        break;

      default:
        response = "Unknown command: " + command;
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
