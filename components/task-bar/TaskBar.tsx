"use client";

import { Dock } from "primereact/dock";

const Taskbar = () => {
  const dockItems = [
    {
      icon: () => <img src="/task-bar-icons/user.png" width="50pxs" />,
      label: "About Me",
      command: () => console.log("About Me"),
    },
    {
      icon: () => <img src="/task-bar-icons/server.png" width="50pxs" />,
      label: "Tech Stack",
      command: () => console.log("Tech Stack"),
    },
    {
      icon: () => <img src="/task-bar-icons/folder.png" width="50pxs" />,
      label: "Projects",
      command: () => console.log("Projects"),
    },
    {
      icon: () => <img src="/task-bar-icons/smartphone.png" width="50pxs" />,
      label: "Contacts",
      command: () => console.log("Contacts"),
    },
  ];
  return <Dock model={dockItems} />;
};

export default Taskbar;
