import TaskBar from "./task-bar/TaskBar";

export function LandingPage() {
  const pinnedApps = [
    { id: 1, name: "About Me", icon: "/technologies/git.png" },
    { id: 2, name: "Projects", icon: "/technologies/npm.png" },
    { id: 3, name: "Contact", icon: "/technologies/react.png" },
  ];
  const systemIcons = [
    { id: 1, name: "System Icon 1", icon: "icon1.png" },
    { id: 2, name: "System Icon 2", icon: "icon2.png" },
  ];

  return (
    <div className="bg-desktop bg-cover bg-center min-h-screen">
      <TaskBar pinnedApps={pinnedApps} systemIcons={systemIcons} />;
    </div>
  );
}
