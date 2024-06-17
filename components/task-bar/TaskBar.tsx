"use client";

import { Dock } from "primereact/dock";

const Taskbar = () => {
  const dockItems = [
    {
      icon: () => <img src="/task-bar-icons/user.png" width={69} />,
      label: "About Me",
      command: () => console.log("About Me"),
    },
    {
      icon: () => <img src="/task-bar-icons/server.png" width={69} />,
      label: "Tech Stack",
      command: () => console.log("Tech Stack"),
    },
    {
      icon: () => <img src="/task-bar-icons/folder.png" width={69} />,
      label: "Projects",
      command: () => console.log("Projects"),
    },
    {
      icon: () => <img src="/task-bar-icons/smartphone.png" width={69} />,
      label: "Contacts",
      command: () => console.log("Contacts"),
    },
  ];
  return (
    <div>
      <Dock model={dockItems} />;
    </div>
  );
};

export default Taskbar;
