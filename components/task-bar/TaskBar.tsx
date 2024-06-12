"use client";
import React, { useEffect, useState } from "react";

interface TaskbarProps {
  pinnedApps: { id: number; name: string; icon?: string }[]; // Array of pinned app data
  systemIcons: { id: number; name: string; icon?: string }[]; // Array of system icon data
}

const Taskbar: React.FC<TaskbarProps> = ({ pinnedApps, systemIcons }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  const openModal = (appId: number) => {
    setSelectedApp(appId);
    setShowModal(true);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="taskbar fixed bottom-0 left-0 w-full h-12 bg-gray-900 flex items-center justify-between px-4">
      <div className="start-button bg-gray-800 rounded-md px-3 py-1 text-white cursor-pointer">
        Start
      </div>

      <div className="pinned-apps flex space-x-4">
        {pinnedApps.map((app) => (
          <button
            key={app.id}
            className="bg-gray-800 rounded-md px-3 py-1 text-white"
            onClick={() => openModal(app.id)}
          >
            {app.icon && (
              <img
                src={app.icon}
                alt={app.name}
                className="h-4 w-4 inline-block mr-2"
              />
            )}
            {app.name}
          </button>
        ))}
      </div>

      <div className="system-icons flex space-x-4">
        {/* {systemIcons.map((icon) => (
          <button
            key={icon.id}
            className="bg-gray-800 rounded-md px-3 py-1 text-white"
          >
            {icon.icon && (
              <img src={icon.icon} alt={icon.name} className="h-4 w-4" />
            )}
          </button>
        ))} */}

        <div className="clock text-white">{formattedTime}</div>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            {/* Content of the modal for the selected app */}
            <h2 className="text-xl font-bold mb-2">
              {selectedApp
                ? pinnedApps.find((app) => app.id === selectedApp)?.name
                : ""}
            </h2>
            {/* ... other modal content */}
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
